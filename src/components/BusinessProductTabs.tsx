"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { BUSINESS_PRODUCT_TABS } from "@/lib/businessProductTabs";
import { getRubroIcon } from "@/lib/rubroIcons";

export function BusinessProductTabs({
  productsByTab,
}: {
  productsByTab: Record<string, Product[]>;
}) {
  const [active, setActive] = useState<string>(BUSINESS_PRODUCT_TABS[0].slug);
  const products = productsByTab[active] ?? [];

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">¿Qué negocio tenés?</h2>
        <p className="mt-1 text-sm text-gray-500">
          Elegí tu rubro y descubrí el equipamiento pensado para vos
        </p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center">
        {BUSINESS_PRODUCT_TABS.map((tab) => {
          const isActive = tab.slug === active;
          return (
            <button
              key={tab.slug}
              type="button"
              onClick={() => setActive(tab.slug)}
              className={`flex w-24 shrink-0 flex-col items-center gap-2 rounded-xl border-2 px-3 py-4 text-center transition-colors sm:w-28 ${
                isActive
                  ? "border-brand bg-brand text-white shadow-sm"
                  : "border-transparent bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7"
                aria-hidden
              >
                {getRubroIcon(tab.label)}
              </svg>
              <span className="text-xs font-semibold leading-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        {products.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-500">
            Todavía no hay productos cargados para este rubro.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
