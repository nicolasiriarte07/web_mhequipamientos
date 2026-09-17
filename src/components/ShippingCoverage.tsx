"use client";

import dynamic from "next/dynamic";

const ShippingMap = dynamic(() => import("@/components/ShippingMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-gray-400">
      Cargando mapa...
    </div>
  ),
});

export function ShippingCoverage() {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">Zona de envíos</h2>
        <p className="mt-1 text-sm text-gray-500">
          Centrados en Carhué, provincia de Buenos Aires.
        </p>
      </div>

      <div className="mt-4 h-80 w-full sm:h-[420px]">
        <ShippingMap />
      </div>

      <div className="flex flex-col gap-3 p-6 pt-4 sm:flex-row sm:items-center sm:gap-8">
        <div className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full border border-brand-dark/40 bg-brand-dark/70" />
          <span className="text-sm text-gray-700">
            <strong className="font-semibold text-gray-900">120 km</strong> — Envío gratis
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full border border-brand/40 bg-brand/20" />
          <span className="text-sm text-gray-700">
            <strong className="font-semibold text-gray-900">250 km</strong> — Envío a convenir
          </span>
        </div>
      </div>
    </div>
  );
}
