import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { FAQ_ITEMS } from "@/lib/faq";
import { whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description:
    "Resolvé tus dudas sobre cómo comprar, medios de pago, envíos, retiro en el local y más en MH Equipamientos.",
  alternates: { canonical: "/preguntas-frecuentes" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function PreguntasFrecuentesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Preguntas Frecuentes</h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Las dudas más comunes antes de comprar. Si no encontrás lo que buscás, escribinos.
        </p>
      </div>

      <Accordion items={FAQ_ITEMS} />

      <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6 text-center shadow-sm sm:p-8">
        <h2 className="text-base font-bold text-gray-900">¿Tenés otra consulta?</h2>
        <p className="mt-1 text-sm text-gray-500">
          Escribinos por WhatsApp y te respondemos a la brevedad.
        </p>
        <a
          href={whatsappUrl("Hola! Tengo una consulta.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1fb659]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Escribir por WhatsApp
        </a>
        <p className="mt-4 text-xs text-gray-400">
          También podés ver{" "}
          <Link href="/contacto" className="text-brand underline">
            todos nuestros medios de contacto
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
