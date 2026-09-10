"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";

const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { addItem } = useCart();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-gray-100 p-5">
          <h2 className="pr-4 text-xl font-bold text-gray-900">{product.titulo}</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="grid gap-6 p-5 sm:grid-cols-2">
          <div className="relative h-64 w-full rounded-xl bg-gray-100 sm:h-full">
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

          <div className="flex flex-col gap-3">
            {product.marca && (
              <span className="w-fit rounded-full bg-gray-900 px-2.5 py-0.5 text-xs font-medium text-white">
                {product.marca}
              </span>
            )}

            {product.descripcion && (
              <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">
                {product.descripcion}
              </p>
            )}

            <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-2xl font-bold text-gray-900">
                {product.precio != null ? priceFormatter.format(product.precio) : "Consultar"}
              </span>
              <button
                onClick={() => addItem(product)}
                disabled={!product.disponible}
                className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {product.disponible ? "Agregar al carrito" : "No disponible"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
