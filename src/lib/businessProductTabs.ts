// Cada rubro no tiene un campo propio en Supabase, así que lo mapeamos a la
// combinación de categorías de producto que mejor le sirve. Los slugs deben
// coincidir con los que ya usamos para ordenar categorías en data.ts
// (alimentos, gastronomia, refrigeracion, exhibicion, hoteleria, oficina).
export const BUSINESS_PRODUCT_TABS = [
  {
    slug: "almacen",
    label: "Almacén",
    categorySlugs: ["alimentos", "refrigeracion", "exhibicion"],
  },
  {
    slug: "rotiseria",
    label: "Rotisería",
    categorySlugs: ["gastronomia", "refrigeracion", "exhibicion"],
  },
  {
    slug: "restaurant",
    label: "Restaurant",
    categorySlugs: ["gastronomia", "refrigeracion", "hoteleria"],
  },
  {
    slug: "pizzeria",
    label: "Pizzería",
    categorySlugs: ["gastronomia", "refrigeracion", "exhibicion"],
  },
  {
    slug: "emprendimiento",
    label: "Emprendimiento Gastronómico",
    categorySlugs: ["gastronomia", "alimentos"],
  },
  {
    slug: "supermercado",
    label: "Supermercado",
    categorySlugs: ["alimentos", "refrigeracion", "exhibicion", "oficina"],
  },
] as const;
