"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { whatsappUrl, PHONE_TEL } from "@/lib/contact";
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

      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappUrl(`Hola! Quiero consultar por: ${product.titulo}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#25D366] px-5 py-3 text-sm font-semibold text-[#128C4A] hover:bg-[#25D366]/10"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Consultar por WhatsApp
        </a>

        <a
          href={`tel:${PHONE_TEL}`}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
          </svg>
          Llamar
        </a>
      </div>
    </div>
  );
}
