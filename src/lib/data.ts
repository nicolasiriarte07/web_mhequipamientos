import { supabase } from "@/lib/supabase/client";
import type { Category, Product } from "@/lib/types";

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error cargando categorías:", error.message);
    return [];
  }
  return data ?? [];
}

export type ProductFilters = {
  search?: string;
  categorySlug?: string;
  sort?: "price-asc" | "price-desc" | "none";
};

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  let query = supabase
    .from("products")
    .select("*, categories(*)")
    .eq("active", true);

  if (filters.search) {
    const term = filters.search.trim();
    query = query.or(
      `name.ilike.%${term}%,brand.ilike.%${term}%,description.ilike.%${term}%`
    );
  }

  if (filters.categorySlug) {
    const { data: category } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", filters.categorySlug)
      .maybeSingle();
    if (category) {
      query = query.eq("category_id", category.id);
    }
  }

  if (filters.sort === "price-asc") {
    query = query.order("price", { ascending: true });
  } else if (filters.sort === "price-desc") {
    query = query.order("price", { ascending: false });
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
