"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/lib/types";

export function ProductFilters({
  categories,
  brands,
}: {
  categories: Category[];
  brands: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("categoria") ?? "";
  const currentBrand = searchParams.get("marca") ?? "";
  const currentSort = searchParams.get("orden") ?? "";
  const immediateOnly = searchParams.get("inmediata") === "1";
  const hasActiveFilters =
    currentCategory || currentBrand || currentSort || immediateOnly || searchParams.get("q");

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Volvemos a la página 1: con un filtro nuevo, quedarse en la página
    // que estaba antes podría mostrar un rango que ya no tiene sentido.
    params.delete("pagina");
    router.push(`/productos${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <div className="flex flex-col flex-wrap gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <label className="flex items-center gap-3 text-sm">
        <span className="flex items-center gap-2 font-medium text-gray-700">
          <span className="h-2 w-2 rounded-full bg-brand" />
          Categoría
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
          Marca
        </span>
        <select
          value={currentBrand}
          onChange={(e) => updateParam("marca", e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700"
        >
          <option value="">Todas</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
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

      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <input
          type="checkbox"
          checked={immediateOnly}
          onChange={(e) => updateParam("inmediata", e.target.checked ? "1" : "")}
          className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
        />
        Solo entrega inmediata
      </label>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => router.push("/productos")}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-brand"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
