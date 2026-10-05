"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { BUSINESS_PRODUCT_TABS } from "@/lib/businessProductTabs";

export function BusinessProductTabs({
  productsByTab,
}: {
  productsByTab: Record<string, Product[]>;
}) {
  const [active, setActive] = useState<string>(BUSINESS_PRODUCT_TABS[0].slug);
  const products = productsByTab[active] ?? [];

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">¿Qué negocio tenés?</h2>
        <p className="mt-1 text-sm text-gray-500">
          Elegí tu rubro y descubrí el equipamiento pensado para vos
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {BUSINESS_PRODUCT_TABS.map((tab) => (
          <button
            key={tab.slug}
            type="button"
            onClick={() => setActive(tab.slug)}
            className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              active === tab.slug
                ? "bg-brand text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
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
