"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-lg border border-gray-200">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-lg text-gray-500 hover:text-gray-900"
            aria-label="Restar cantidad"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-2 text-lg text-gray-500 hover:text-gray-900"
            aria-label="Sumar cantidad"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={!product.disponible}
          className="flex-1 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {!product.disponible ? "No disponible" : added ? "¡Agregado!" : "Agregar al carrito"}
        </button>
      </div>

      <a
        href={whatsappUrl(`Hola! Quiero consultar por: ${product.titulo}`)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg border border-[#25D366] px-5 py-3 text-sm font-semibold text-[#128C4A] hover:bg-[#25D366]/10"
      >
        <WhatsAppIcon className="h-4 w-4" />
        Consultar por WhatsApp
      </a>
    </div>
  );
}
