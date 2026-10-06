import type { ReactNode } from "react";

// Mapa de ícono por rubro para el bloque "Ideal para" de la ficha de
// producto. Las claves están normalizadas (minúsculas, sin acentos) y se
// matchean por "incluye", así que "carnicerías" matchea "carniceria". Si un
// rubro no está mapeado, se usa FALLBACK_ICON (un local/comercio genérico)
// para que nunca quede sin ícono, sin importar qué texto devuelva ChatGPT.
const RUBRO_ICONS: Record<string, ReactNode> = {
  almacen: <path d="M3 9l1-5h16l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6" />,
  kiosco: <path d="M3 9l1-5h16l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6" />,
  supermercado: (
    <path d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13 5.4 5M7 13l-1.5 3H17M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
  ),
  rotiseria: (
    <path d="M12 2c1.5 3-2.5 4.5-2.5 8.5a2.5 2.5 0 0 0 5 0c0-1-.5-2-.5-3 2 1.5 4 4.5 4 7.5a6 6 0 0 1-12 0c0-6 4-7 6-13Z" />
  ),
  restaurant: <path d="M6 2v8a2 2 0 0 0 4 0V2M8 10v12M16 2c-1 0-2 1-2 3v4c0 1 .5 2 2 2v9" />,
  pizzeria: <path d="M12 2 4 20a10 10 0 0 0 16 0L12 2Z M9 12h.01M14 14h.01M11.5 17h.01" />,
  panaderia: (
    <path d="M4 14a8 6 0 1 0 16 0 8 6 0 1 0-16 0Z M9 11l-1 3M13 10l-1 4M17 11l-1 3" />
  ),
  carniceria: (
    <path d="M17 3a4 4 0 0 0-4 4c0 1.5.5 2 1 3s1 2 1 3.5a4.5 4.5 0 1 1-9 0c0-1 .3-1.7.7-2.4M17 3c1.5 0 4 1 4 4s-2 4-4 4M6 15l-3 3m0 3 7-7" />
  ),
  fiambreria: (
    <path d="M17 3a4 4 0 0 0-4 4c0 1.5.5 2 1 3s1 2 1 3.5a4.5 4.5 0 1 1-9 0c0-1 .3-1.7.7-2.4M17 3c1.5 0 4 1 4 4s-2 4-4 4M6 15l-3 3m0 3 7-7" />
  ),
  verduleria: (
    <path d="M12 2c2 2 2 5 0 7M12 9C8 9 5 12 5 16a7 7 0 0 0 14 0c0-4-3-7-7-7Z M8 16h8" />
  ),
  bar: <path d="M3 4h18l-8 9v6h4M11 13v6H7M3 4l8 9" />,
  hotel: (
    <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8 M2 20v-2h20v2 M6 10V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4 M2 20V10" />
  ),
  airbnb: <path d="M3 11.5 12 4l9 7.5M5 10v10h14V10 M9 20v-6h6v6" />,
  emprendimiento: (
    <>
      <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
      <path d="M6 17h12" />
    </>
  ),
};

const FALLBACK_ICON: ReactNode = (
  <path d="M3 9l1-5h16l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6" />
);

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

export function getRubroIcon(rubro: string): ReactNode {
  const normalized = normalize(rubro);
  const key = Object.keys(RUBRO_ICONS).find((k) => normalized.includes(k));
  return key ? RUBRO_ICONS[key] : FALLBACK_ICON;
}
