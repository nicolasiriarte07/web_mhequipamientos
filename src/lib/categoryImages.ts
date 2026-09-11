function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

// Agregá acá el slug de cada categoría a medida que subís su imagen a
// public/categorias/<slug>.png (ej: "refrigeracion" -> public/categorias/refrigeracion.png).
const AVAILABLE_IMAGES = new Set<string>([
  "refrigeracion",
  "gastronomia",
  "alimentos",
  "exhibicion",
  "hoteleria",
]);

export function getCategoryImage(nombre: string): string | null {
  const key = normalize(nombre);
  const slug = [...AVAILABLE_IMAGES].find((s) => key.includes(s));
  return slug ? `/categorias/${slug}.png` : null;
}
