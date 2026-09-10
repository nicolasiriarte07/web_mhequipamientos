"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/lib/types";

export function ProductFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("categoria") ?? "";
  const currentSort = searchParams.get("orden") ?? "";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/productos${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <label className="flex items-center gap-3 text-sm">
        <span className="flex items-center gap-2 font-medium text-gray-700">
          <span className="h-2 w-2 rounded-full bg-brand" />
          Filtrar por categoría
        </span>
        <select
          value={currentCategory}
          onChange={(e) => updateParam("categoria", e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700"
        >
          <option value="">Todas</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre.toUpperCase()}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-3 text-sm">
        <span className="flex items-center gap-2 font-medium text-gray-700">
          <span className="h-2 w-2 rounded-full bg-brand" />
          Ordenar por precio
        </span>
        <select
          value={currentSort}
          onChange={(e) => updateParam("orden", e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700"
        >
          <option value="">Sin ordenar</option>
          <option value="price-asc">Menor a mayor</option>
          <option value="price-desc">Mayor a menor</option>
        </select>
      </label>
    </div>
  );
}
