import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
      <div className="relative h-44 w-full bg-gray-100">
        {category.image_url ? (
          <Image
            src={category.image_url}
            alt={category.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            Sin imagen
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-sm font-bold tracking-wide text-gray-800">
          {category.name.toUpperCase()}
        </h3>
        {category.description && (
          <p className="mt-1 text-sm text-gray-500">{category.description}</p>
        )}
        <Link
          href={`/productos?categoria=${category.slug}`}
          className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Ver Productos
        </Link>
      </div>
    </div>
  );
}
