"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { searchProductSuggestions, type ProductSuggestion } from "@/lib/productSuggestions";

const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function SearchBar({
  initialValue = "",
  compact = false,
}: {
  initialValue?: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const term = value.trim();
    let cancelled = false;

    const timer = setTimeout(
      () => {
        if (term.length < 2) {
          if (!cancelled) setSuggestions([]);
          return;
        }
        searchProductSuggestions(term).then((results) => {
          if (!cancelled) setSuggestions(results);
        });
      },
      term.length < 2 ? 0 : 250
    );

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    const params = new URLSearchParams();
    if (value.trim()) params.set("q", value.trim());
    router.push(`/productos${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function goToProduct(id: number) {
    setOpen(false);
    router.push(`/productos/${id}`);
  }

  const showDropdown = open && value.trim().length >= 2;

  return (
    <div ref={containerRef} className="relative">
      <form
        onSubmit={handleSubmit}
        className={`flex items-center gap-3 rounded-2xl border border-black/5 bg-white shadow-sm ${
          compact ? "px-4 py-2.5" : "px-5 py-4"
        }`}
      >
        <span aria-hidden className="text-gray-400">
          🔍
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Buscar productos por nombre, marca o descripción..."
          className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
        />
      </form>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl bg-white text-left shadow-xl ring-1 ring-black/5">
          {suggestions.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto py-1">
              {suggestions.map((product) => (
                <li key={product.id}>
                  <button
                    type="button"
                    onClick={() => goToProduct(product.id)}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-brand/5"
                  >
                    <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      {product.imagen_url && (
                        <Image
                          src={product.imagen_url}
                          alt=""
                          fill
                          sizes="40px"
                          className="object-contain p-0.5"
                        />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-gray-800">
                        {product.titulo}
                      </span>
                      {product.precio != null && (
                        <span className="block text-xs font-semibold text-brand-dark">
                          {priceFormatter.format(product.precio)}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-gray-500">Sin resultados para &quot;{value}&quot;</p>
          )}
        </div>
      )}
    </div>
  );
}
