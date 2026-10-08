"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { BUSINESS_PRODUCT_TABS } from "@/lib/businessProductTabs";
import { getRubroIcon } from "@/lib/rubroIcons";
import { ProductCard } from "@/components/ProductCard";
import { whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { event } from "@/lib/gtag";
import { event as fbEvent } from "@/lib/fbpixel";

const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function ProjectSimulator({
  productsByTab,
}: {
  productsByTab: Record<string, Product[]>;
}) {
  const [rubroSlug, setRubroSlug] = useState<string | null>(null);
  const [m2, setM2] = useState("");
  const [presupuesto, setPresupuesto] = useState("");

  const activeTab = BUSINESS_PRODUCT_TABS.find((t) => t.slug === rubroSlug);
  const products = useMemo(
    () => (rubroSlug ? (productsByTab[rubroSlug] ?? []) : []),
    [rubroSlug, productsByTab]
  );
  const budgetNumber = Number(presupuesto) || 0;

  // Vamos sumando los productos del combo en el orden recomendado hasta que
  // el presupuesto no alcance; el resto queda marcado como "para más
  // adelante". Si no cargó presupuesto, se muestra el combo completo.
  const { included, excluded, total } = useMemo(() => {
    let running = 0;
    const included: Product[] = [];
    const excluded: Product[] = [];
    for (const product of products) {
      const price = product.precio ?? 0;
      if (budgetNumber > 0 && running + price > budgetNumber) {
        excluded.push(product);
      } else {
        included.push(product);
        running += price;
      }
    }
    const total = products.reduce((sum, p) => sum + (p.precio ?? 0), 0);
    return { included, excluded, total };
  }, [products, budgetNumber]);

  const showResults = Boolean(activeTab) && products.length > 0;

  const message = [
    "Hola! Estoy por iniciar un nuevo proyecto.",
    activeTab ? `Rubro: ${activeTab.label}` : null,
    m2.trim() ? `Metros cuadrados: ${m2.trim()} m²` : null,
    budgetNumber > 0 ? `Presupuesto aproximado: ${priceFormatter.format(budgetNumber)}` : null,
    "",
    "Me gustaría recibir asesoramiento para equipar mi negocio.",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  function handleWhatsAppClick() {
    event("generate_lead", {
      method: "project_simulator",
      rubro: activeTab?.slug,
      m2: m2.trim() || undefined,
      presupuesto: budgetNumber || undefined,
    });
    fbEvent("Lead");
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          ¿Estás por iniciar un nuevo proyecto?
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Contanos un poco sobre tu negocio y te armamos una propuesta a medida
        </p>
      </div>

      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <div>
          <label className="text-sm font-semibold text-gray-700">
            ¿Qué tipo de negocio tenés?
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {BUSINESS_PRODUCT_TABS.map((tab) => {
              const isActive = tab.slug === rubroSlug;
              return (
                <button
                  key={tab.slug}
                  type="button"
                  onClick={() => setRubroSlug(tab.slug)}
                  className={`flex items-center gap-2 rounded-xl border-2 px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-brand bg-brand text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-brand/40"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 shrink-0"
                    aria-hidden
                  >
                    {getRubroIcon(tab.label)}
                  </svg>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="sim-m2" className="text-sm font-semibold text-gray-700">
              ¿Cuántos m² tiene tu local?
            </label>
            <input
              id="sim-m2"
              type="number"
              min={0}
              value={m2}
              onChange={(e) => setM2(e.target.value)}
              placeholder="Ej: 40"
              className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand"
            />
          </div>
          <div>
            <label htmlFor="sim-presupuesto" className="text-sm font-semibold text-gray-700">
              ¿Con qué presupuesto contás?
            </label>
            <input
              id="sim-presupuesto"
              type="number"
              min={0}
              value={presupuesto}
              onChange={(e) => setPresupuesto(e.target.value)}
              placeholder="Ej: 1000000"
              className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand"
            />
          </div>
        </div>

        {showResults && (
          <div className="flex flex-col gap-5">
            <div className="rounded-xl bg-brand/5 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Total del combo recomendado para {activeTab?.label}
                </span>
                <span className="text-lg font-bold text-brand-dark">
                  {priceFormatter.format(total)}
                </span>
              </div>
              {budgetNumber > 0 && (
                <p className="mt-1 text-xs text-gray-600">
                  {included.length === products.length
                    ? "¡Tu presupuesto cubre todo el combo recomendado!"
                    : `Con tu presupuesto cubrís ${included.length} de ${products.length} productos recomendados.`}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 items-stretch gap-4 sm:gap-6 lg:grid-cols-4">
              {included.map((product) => (
                <div key={product.id} className="flex flex-col gap-2">
                  <div className="flex-1">
                    <ProductCard product={product} />
                  </div>
                  {budgetNumber > 0 && (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-green-700">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3.5 w-3.5"
                        aria-hidden
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Dentro de tu presupuesto
                    </span>
                  )}
                </div>
              ))}
              {excluded.map((product) => (
                <div key={product.id} className="flex flex-col gap-2 opacity-70">
                  <div className="flex-1">
                    <ProductCard product={product} />
                  </div>
                  <span className="text-xs font-medium text-gray-500">Para más adelante</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <a
          href={whatsappUrl(message)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1fb659]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Pedir asesoramiento por WhatsApp
        </a>
      </div>
    </div>
  );
}
