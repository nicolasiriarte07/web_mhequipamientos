import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/types";
import { CategoryIcon } from "@/components/CategoryIcon";
import { getCategoryImage } from "@/lib/categoryImages";

export function CategoryCard({ category }: { category: Category }) {
  const image = getCategoryImage(category.nombre);

  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
      <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-brand to-brand-dark">
        {image ? (
          <>
            <Image src={image} alt={category.nombre} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/10 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-4 text-xl font-extrabold tracking-wide text-white">
              {category.nombre.toUpperCase()}
            </span>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-10" aria-hidden>
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
        )}
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
