import Link from "next/link";
import type { Category } from "@/lib/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
      <div className="flex h-32 w-full items-center justify-center bg-gradient-to-br from-brand to-brand-dark">
        <span className="text-2xl font-extrabold tracking-wide text-white/90">
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
