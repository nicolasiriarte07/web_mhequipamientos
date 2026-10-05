import { cache } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Category, Product } from "@/lib/types";

const CATEGORY_ORDER = [
  "alimentos",
  "gastronomia",
  "refrigeracion",
  "exhibicion",
  "hoteleria",
  "oficina",
];

function normalizeCategoryName(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function sortByCategoryOrder(categories: Category[]): Category[] {
  return [...categories].sort((a, b) => {
    const ai = CATEGORY_ORDER.findIndex((slug) => normalizeCategoryName(a.nombre).includes(slug));
    const bi = CATEGORY_ORDER.findIndex((slug) => normalizeCategoryName(b.nombre).includes(slug));
    if (ai === -1 && bi === -1) return a.nombre.localeCompare(b.nombre);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

export const getCategories = cache(async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .order("nombre", { ascending: true });

  if (error) {
    console.error("Error cargando categorías:", error.message);
    return [];
  }
  return sortByCategoryOrder(data ?? []);
});

export type ProductFilters = {
  search?: string;
  categoryId?: number;
  brand?: string;
  immediateOnly?: boolean;
  sort?: "price-asc" | "price-desc" | "none";
  page?: number;
  pageSize?: number;
};

export const PRODUCTS_PAGE_SIZE = 24;

export type ProductsPage = {
  products: Product[];
  total: number;
};

export async function getProducts(filters: ProductFilters = {}): Promise<ProductsPage> {
  let query = supabase
    .from("productos")
    .select("*, categorias(*)", { count: "exact" })
    .eq("disponible", true);

  if (filters.search) {
    const term = filters.search.trim();
    query = query.or(
      `titulo.ilike.%${term}%,marca.ilike.%${term}%,descripcion.ilike.%${term}%`
    );
  }

  if (filters.categoryId) {
    query = query.eq("categoria_id", filters.categoryId);
  }

  if (filters.brand) {
    query = query.eq("marca", filters.brand);
  }

  if (filters.immediateOnly) {
    query = query.eq("entrega_inmediata", true);
  }

  if (filters.sort === "price-asc") {
    query = query.order("precio", { ascending: true });
  } else if (filters.sort === "price-desc") {
    query = query.order("precio", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const page = filters.page && filters.page > 0 ? filters.page : 1;
  const pageSize = filters.pageSize ?? PRODUCTS_PAGE_SIZE;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error("Error cargando productos:", error.message);
    return { products: [], total: 0 };
  }
  return { products: data ?? [], total: count ?? 0 };
}

// PRNG determinístico (mulberry32) para poder "barajar" productos de forma
// estable durante todo el día, y que cambie solo una vez por día.
function mulberry32(seed: number) {
  let s = seed;
  return function random() {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFromToday(): number {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = (hash << 5) - hash + today.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export async function getMonthlyOffers(count = 5): Promise<Product[]> {
  const { data, error } = await supabase
    .from("productos")
    .select("*, categorias(*)")
    .eq("entrega_inmediata", true)
    .eq("disponible", true);

  if (error) {
    console.error("Error cargando ofertas del mes:", error.message);
    return [];
  }

  const products = data ?? [];
  const random = mulberry32(seedFromToday());
  const shuffled = [...products];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export async function getProductById(id: number): Promise<Product | null> {
  const { data, error } = await supabase
    .from("productos")
    .select("*, categorias(*), producto_imagenes(*)")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error cargando producto:", error.message);
    return null;
  }
  return data;
}

export async function getRelatedProducts(
  categoryId: number,
  excludeId: number,
  limit = 4
): Promise<Product[]> {
  const { data, error } = await supabase
    .from("productos")
    .select("*, categorias(*)")
    .eq("categoria_id", categoryId)
    .eq("disponible", true)
    .neq("id", excludeId)
    .limit(limit);

  if (error) {
    console.error("Error cargando productos relacionados:", error.message);
    return [];
  }
  return data ?? [];
}

function shuffleProducts(products: Product[]): Product[] {
  const copy = [...products];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

async function fetchComplementaryPool(
  categoryIds: number[],
  excludeIds: number[],
  poolSize: number
): Promise<Product[]> {
  let query = supabase.from("productos").select("*, categorias(*)").eq("disponible", true);

  if (categoryIds.length > 0) {
    query = query.in("categoria_id", categoryIds);
  }
  if (excludeIds.length > 0) {
    query = query.not("id", "in", `(${excludeIds.join(",")})`);
  }

  const { data, error } = await query.limit(poolSize);

  if (error) {
    console.error("Error cargando productos complementarios:", error.message);
    return [];
  }
  return data ?? [];
}

// Completa un bloque con productos complementarios (misma categoría que los
// productos de origen) hasta llegar a `limit`, sin repetir `excludeIds`. Si
// no alcanzan los productos de esas categorías, rellena con cualquier otro
// producto disponible.
export async function getComplementaryProducts(
  categoryIds: number[],
  excludeIds: number[],
  limit: number
): Promise<Product[]> {
  if (limit <= 0) return [];

  const sameCategory = shuffleProducts(
    await fetchComplementaryPool(categoryIds, excludeIds, limit * 4)
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const alreadyPicked = [...excludeIds, ...sameCategory.map((p) => p.id)];
  const rest = shuffleProducts(
    await fetchComplementaryPool([], alreadyPicked, (limit - sameCategory.length) * 4)
  );

  return [...sameCategory, ...rest].slice(0, limit);
}

export const getBrands = cache(async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from("productos")
    .select("marca")
    .eq("disponible", true)
    .not("marca", "is", null);

  if (error) {
    console.error("Error cargando marcas:", error.message);
    return [];
  }

  const brands = new Set((data ?? []).map((row) => row.marca as string));
  return [...brands].sort((a, b) => a.localeCompare(b));
});

export async function getProductsByCategorySlug(slug: string, limit = 12): Promise<Product[]> {
  const categories = await getCategories();
  const category = categories.find((c) => normalizeCategoryName(c.nombre).includes(slug));
  if (!category) return [];

  const { data, error } = await supabase
    .from("productos")
    .select("*, categorias(*)")
    .eq("categoria_id", category.id)
    .eq("disponible", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error(`Error cargando productos de ${slug}:`, error.message);
    return [];
  }
  return data ?? [];
}

export async function getProductsByCategorySlugs(
  slugs: string[],
  limit = 8
): Promise<Product[]> {
  const categories = await getCategories();
  const categoryIds = categories
    .filter((c) => slugs.some((slug) => normalizeCategoryName(c.nombre).includes(slug)))
    .map((c) => c.id);

  if (categoryIds.length === 0) return [];

  const { data, error } = await supabase
    .from("productos")
    .select("*, categorias(*)")
    .in("categoria_id", categoryIds)
    .eq("disponible", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error(`Error cargando productos para ${slugs.join(", ")}:`, error.message);
    return [];
  }
  return data ?? [];
}

export async function getBriketMaster(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("productos")
    .select("*, categorias(*)")
    .eq("disponible", true)
    .ilike("marca", "briket")
    .ilike("titulo", "%master%")
    .order("precio", { ascending: true });

  if (error) {
    console.error("Error cargando exhibidoras Briket:", error.message);
    return [];
  }
  return data ?? [];
}
