import Link from "next/link";
import type { Category } from "@/lib/types";
import { CategoryIcon } from "@/components/CategoryIcon";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
      <div className="relative flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden bg-gradient-to-br from-brand to-brand-dark">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-10"
          aria-hidden
        >
          <pattern
            id={`grid-${category.id}`}
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.4" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#grid-${category.id})`} />
        </svg>

        <CategoryIcon category={category.nombre} className="h-11 w-11 text-white" />
        <span className="text-xl font-extrabold tracking-wide text-white">
          {category.nombre.toUpperCase()}
        </span>
      </div>
      <div className="p-5">
        {category.descripcion && (
          <p className="text-sm text-gray-500">{category.descripcion}</p>
        )}
        <Link
          href={`/productos?categoria=${category.id}`}
          className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Ver Productos
        </Link>
      </div>
    </div>
  );
}
