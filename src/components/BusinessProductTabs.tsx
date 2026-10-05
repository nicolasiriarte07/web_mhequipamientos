"use client";

import { useState, type ReactNode } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { BUSINESS_PRODUCT_TABS } from "@/lib/businessProductTabs";

const TAB_ICONS: Record<string, ReactNode> = {
  almacen: <path d="M3 9l1-5h16l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6" />,
  rotiseria: (
    <path d="M12 2c1.5 3-2.5 4.5-2.5 8.5a2.5 2.5 0 0 0 5 0c0-1-.5-2-.5-3 2 1.5 4 4.5 4 7.5a6 6 0 0 1-12 0c0-6 4-7 6-13Z" />
  ),
  restaurant: <path d="M6 2v8a2 2 0 0 0 4 0V2M8 10v12M16 2c-1 0-2 1-2 3v4c0 1 .5 2 2 2v9" />,
  pizzeria: <path d="M12 2 4 20a10 10 0 0 0 16 0L12 2Z M9 12h.01M14 14h.01M11.5 17h.01" />,
  emprendimiento: (
    <>
      <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
      <path d="M6 17h12" />
    </>
  ),
  supermercado: (
    <path d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13 5.4 5M7 13l-1.5 3H17M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
  ),
  panaderia: (
    <path d="M4 14a8 6 0 1 0 16 0 8 6 0 1 0-16 0Z M9 11l-1 3M13 10l-1 4M17 11l-1 3" />
  ),
};

const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function BusinessProductTabs({
  productsByTab,
}: {
  productsByTab: Record<string, Product[]>;
}) {
  const [active, setActive] = useState<string>(BUSINESS_PRODUCT_TABS[0].slug);
  const products = productsByTab[active] ?? [];
  const comboTotal = products.reduce((sum, p) => sum + (p.precio ?? 0), 0);

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
                {TAB_ICONS[tab.slug]}
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
          <>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-brand/5 px-5 py-4">
              <span className="text-sm font-medium text-gray-700">Total del combo</span>
              <span className="text-xl font-bold text-brand">
                {priceFormatter.format(comboTotal)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
