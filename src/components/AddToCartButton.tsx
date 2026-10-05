"use client";

import type { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { event as fbEvent } from "@/lib/fbpixel";

export function AddToCartButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
        fbEvent("AddToCart", {
          content_name: product.titulo,
          value: product.precio ?? undefined,
          currency: "ARS",
        });
        showToast(`"${product.titulo}" se agregó al carrito`, {
          label: "Ver carrito",
          href: "/carrito",
        });
      }}
      disabled={!product.disponible}
      className={
        className ??
        "rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-gray-300"
      }
    >
      {product.disponible ? "Agregar al carrito" : "No disponible"}
    </button>
  );
}
