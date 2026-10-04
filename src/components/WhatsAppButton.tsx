"use client";

import { whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { useStickyBar } from "@/context/StickyBarContext";

export function WhatsAppButton() {
  const { active } = useStickyBar();

  return (
    <div
      className={`fixed right-5 z-50 transition-[bottom] ${active ? "bottom-20 sm:bottom-5" : "bottom-5"}`}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-75" />
      <a
        href={whatsappUrl("Hola! Quiero hacer una consulta sobre sus productos.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribinos por WhatsApp"
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl ring-4 ring-white/50 transition-transform hover:scale-110"
      >
        <WhatsAppIcon className="h-8 w-8" />
      </a>
    </div>
  );
}
