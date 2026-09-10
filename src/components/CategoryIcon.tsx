import type { ReactNode } from "react";

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

const icons: Record<string, ReactNode> = {
  refrigeracion: (
    <path d="M12 2v20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3M2 12h20M2 12l3-3M2 12l3 3M22 12l-3-3M22 12l-3 3M5.5 5.5l13 13M5.5 18.5l13-13" />
  ),
  gastronomia: (
    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z M6 17h12" />
  ),
  alimentos: (
    <path d="M18 8h1a4 4 0 0 1 0 8h-1 M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z M6 1v3 M10 1v3 M14 1v3" />
  ),
  exhibicion: (
    <path d="M3 3h18v4H3z M4 7v13a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V7" />
  ),
  hoteleria: (
    <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8 M2 20v-2h20v2 M6 10V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4 M2 20V10" />
  ),
  oficina: (
    <path d="M20 7h-4V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v3H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1Z M8 7V4h8v3" />
  ),
};

const defaultIcon = (
  <path d="M21 8 12 3 3 8l9 5 9-5Z M3 8v8l9 5 9-5V8 M12 13v8" />
);

export function CategoryIcon({ category, className }: { category: string; className?: string }) {
  const key = normalize(category);
  const match = Object.keys(icons).find((k) => key.includes(k));
  const path = match ? icons[match] : defaultIcon;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {path}
    </svg>
  );
}
