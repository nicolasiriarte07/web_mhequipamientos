// Rubros de negocio. Los productos que aplican a cada uno se taguean en
// Supabase (columna "rubros", array de estos mismos slugs) — ver
// getProductsByRubro en data.ts.
export const BUSINESS_PRODUCT_TABS = [
  { slug: "almacen", label: "Almacén" },
  { slug: "rotiseria", label: "Rotisería" },
  { slug: "restaurant", label: "Restaurant" },
  { slug: "pizzeria", label: "Pizzería" },
  { slug: "emprendimiento", label: "Emprendimiento Gastronómico" },
  { slug: "supermercado", label: "Supermercado" },
  { slug: "panaderia", label: "Panadería" },
] as const;
