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
};

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  let query = supabase
    .from("productos")
    .select("*, categorias(*)")
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

  const { data, error } = await query;

  if (error) {
    console.error("Error cargando productos:", error.message);
    return [];
  }
  return data ?? [];
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
    .select("*, categorias(*)")
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
