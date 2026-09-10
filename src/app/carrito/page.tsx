"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export default function CarritoPage() {
  const { items, setQuantity, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">Tu carrito está vacío</h1>
        <Link
          href="/productos"
          className="mt-6 inline-block rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Tu carrito</h1>

      <div className="flex flex-col gap-4">
        {items.map(({ product, quantity }) => {
          const image = product.image_url ?? product.images?.[0] ?? null;
          return (
            <div
              key={product.id}
              className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-sm"
            >
              <div className="relative h-20 w-20 shrink-0 rounded-lg bg-gray-100">
                {image && (
                  <Image src={image} alt={product.name} fill className="rounded-lg object-contain p-1" />
                )}
              </div>

              <div className="flex-1">
                <p className="font-semibold text-gray-900">{product.name}</p>
                {product.brand && <p className="text-sm text-gray-500">{product.brand}</p>}
              </div>

              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(product.id, Number(e.target.value))}
                className="w-16 rounded-lg border border-gray-200 px-2 py-1 text-center text-sm"
              />

              <span className="w-28 text-right font-semibold text-gray-900">
                {priceFormatter.format((product.price ?? 0) * quantity)}
              </span>

              <button
                onClick={() => removeItem(product.id)}
                className="text-sm text-red-500 hover:underline"
              >
                Quitar
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <span className="text-lg font-semibold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-brand">{priceFormatter.format(total)}</span>
      </div>
    </div>
  );
}
