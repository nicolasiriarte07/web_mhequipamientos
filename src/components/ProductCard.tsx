"use client";

import Image from "next/image";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";

const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const image = product.image_url ?? product.images?.[0] ?? null;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
      <div className="relative h-52 w-full bg-gray-100">
        {image ? (
          <Image src={image} alt={product.name} fill className="object-contain p-4" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            Sin imagen
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-semibold text-gray-900">{product.name}</h3>

        {product.brand && (
          <span className="w-fit rounded-full bg-gray-900 px-2.5 py-0.5 text-xs font-medium text-white">
            {product.brand}
          </span>
        )}

        {product.description && (
          <p className="line-clamp-3 text-sm text-gray-500" title={product.description}>
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-bold text-gray-900">
            {product.price != null ? priceFormatter.format(product.price) : "Consultar"}
          </span>
          <button
            onClick={() => addItem(product)}
            disabled={product.stock <= 0}
            className="rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {product.stock > 0 ? "Agregar" : "Sin stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
