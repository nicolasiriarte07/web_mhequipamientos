"use client";

import type { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";

export function AddToCartButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { addItem } = useCart();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
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
