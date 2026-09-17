"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { ProductModal } from "@/components/ProductModal";

const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") setOpen(true);
        }}
        className="flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-md"
      >
        <div className="relative h-40 w-full bg-gray-100 sm:h-52">
          {product.imagen_url ? (
            <Image
              src={product.imagen_url}
              alt={product.titulo}
              fill
              className="object-contain p-4"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              Sin imagen
            </div>
          )}
          {product.entrega_inmediata && (
            <span className="absolute left-3 top-3 rounded-full bg-green-600 px-2.5 py-0.5 text-xs font-semibold text-white">
              Entrega inmediata
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-gray-900 sm:text-base">{product.titulo}</h3>

          {product.marca && (
            <span className="w-fit rounded-full bg-gray-900 px-2.5 py-0.5 text-xs font-medium text-white">
              {product.marca}
            </span>
          )}

          <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
            <span className="text-base font-bold text-gray-900 sm:text-lg">
              {product.precio != null ? priceFormatter.format(product.precio) : "Consultar"}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addItem(product);
              }}
              disabled={!product.disponible}
              className="whitespace-nowrap rounded-lg bg-brand px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-gray-300 sm:px-3 sm:py-2 sm:text-sm"
            >
              {product.disponible ? "Agregar" : "No disponible"}
            </button>
          </div>
        </div>
      </div>

      {open && <ProductModal product={product} onClose={() => setOpen(false)} />}
    </>
  );
}
