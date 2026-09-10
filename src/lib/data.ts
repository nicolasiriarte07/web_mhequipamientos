import { supabase } from "@/lib/supabase/client";
import type { Category, Product } from "@/lib/types";

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .order("nombre", { ascending: true });

  if (error) {
    console.error("Error cargando categorías:", error.message);
    return [];
  }
  return data ?? [];
}

export type ProductFilters = {
  search?: string;
  categoryId?: number;
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
