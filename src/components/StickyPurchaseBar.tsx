"use client";

import { useEffect } from "react";
import type { Product } from "@/lib/types";
import { whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { useStickyBar } from "@/context/StickyBarContext";

const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function StickyPurchaseBar({ product, anchorId }: { product: Product; anchorId: string }) {
  const { active, setActive } = useStickyBar();

  useEffect(() => {
    const anchor = document.getElementById(anchorId);
    if (!anchor) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px" }
    );
    observer.observe(anchor);

    return () => {
      observer.disconnect();
      setActive(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorId]);

  if (!active) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-black/10 bg-white p-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] sm:hidden">
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs text-gray-500">{product.titulo}</p>
        <p className="text-lg font-extrabold text-brand-dark">
          {product.precio != null ? priceFormatter.format(product.precio) : "Consultar"}
        </p>
      </div>
      <a
        href={whatsappUrl(`Hola! Quiero consultar por: ${product.titulo}`)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#25D366] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1fb659]"
      >
        <WhatsAppIcon className="h-4 w-4" />
        Consultar
      </a>
    </div>
  );
}
