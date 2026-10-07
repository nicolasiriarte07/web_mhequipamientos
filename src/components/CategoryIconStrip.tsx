import Link from "next/link";
import { CategoryIcon } from "@/components/CategoryIcon";
import type { Category } from "@/lib/types";

export function CategoryIconStrip({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null;

  return (
    <div className="mx-auto max-w-[1600px] px-4 pt-6 sm:px-6 lg:px-10">
      <div className="flex gap-5 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/productos?categoria=${category.id}`}
            className="flex w-20 shrink-0 flex-col items-center gap-2 text-center sm:w-24"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand transition-colors hover:bg-brand/15 sm:h-16 sm:w-16">
              <CategoryIcon category={category.nombre} className="h-7 w-7 sm:h-8 sm:w-8" />
            </span>
            <span className="text-xs font-medium leading-tight text-gray-700">
              {category.nombre}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
