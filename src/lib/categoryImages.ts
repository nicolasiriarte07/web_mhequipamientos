function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

// Agregá acá el slug de cada categoría a medida que subís su imagen a
// public/categorias/<slug>.jpg (ej: "refrigeracion" -> public/categorias/refrigeracion.jpg).
const AVAILABLE_IMAGES = new Set<string>([
  // "refrigeracion",
]);

export function getCategoryImage(nombre: string): string | null {
  const key = normalize(nombre);
  const slug = [...AVAILABLE_IMAGES].find((s) => key.includes(s));
  return slug ? `/categorias/${slug}.jpg` : null;
}
