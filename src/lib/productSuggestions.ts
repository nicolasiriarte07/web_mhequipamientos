import { supabase } from "@/lib/supabase/client";

export type ProductSuggestion = {
  id: number;
  titulo: string;
  imagen_url: string | null;
  precio: number | null;
};

export async function searchProductSuggestions(
  query: string,
  limit = 6
): Promise<ProductSuggestion[]> {
  const term = query.trim();
  if (term.length < 2) return [];

  const { data, error } = await supabase
    .from("productos")
    .select("id, titulo, imagen_url, precio")
    .eq("disponible", true)
    .ilike("titulo", `%${term}%`)
    .limit(20);

  if (error) {
    console.error("Error buscando sugerencias:", error.message);
    return [];
  }

  // Los que arrancan con el término buscado van primero (ej: "env" arriba
  // de "Envasadora"), el resto de las coincidencias por orden alfabético.
  const normalizedTerm = term.toLowerCase();
  const sorted = [...(data ?? [])].sort((a, b) => {
    const aStarts = a.titulo.toLowerCase().startsWith(normalizedTerm) ? 0 : 1;
    const bStarts = b.titulo.toLowerCase().startsWith(normalizedTerm) ? 0 : 1;
    if (aStarts !== bStarts) return aStarts - bStarts;
    return a.titulo.localeCompare(b.titulo);
  });

  return sorted.slice(0, limit);
}
