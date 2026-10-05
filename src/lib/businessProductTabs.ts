// Combos armados a mano por rubro: cada uno es una lista fija de IDs de
// producto (Supabase), elegida para mostrar el equipamiento ideal de ese
// negocio y poder sumar un "total del combo".
export const BUSINESS_PRODUCT_TABS = [
  {
    slug: "almacen",
    label: "Almacén",
    productIds: [147, 190, 536, 141, 180],
  },
  {
    slug: "rotiseria",
    label: "Rotisería",
    productIds: [178, 191, 305, 534, 118],
  },
  {
    slug: "restaurant",
    label: "Restaurant",
    productIds: [113, 139, 166, 536, 172],
  },
  {
    slug: "pizzeria",
    label: "Pizzería",
    productIds: [161, 163, 533, 154, 179],
  },
  {
    slug: "emprendimiento",
    label: "Emprendimiento Gastronómico",
    productIds: [127, 142, 181, 556, 119],
  },
  {
    slug: "supermercado",
    label: "Supermercado",
    productIds: [150, 193, 533, 543, 522],
  },
  {
    slug: "panaderia",
    label: "Panadería",
    productIds: [563, 561, 556, 522, 120],
  },
] as const;
