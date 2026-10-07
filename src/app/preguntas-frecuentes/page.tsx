import type { Metadata } from "next";
import Link from "next/link";
import { Accordion, type AccordionItemData } from "@/components/Accordion";
import { BUSINESS_ADDRESS, BUSINESS_HOURS } from "@/lib/business";
import { whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description:
    "Resolvé tus dudas sobre cómo comprar, medios de pago, envíos, retiro en el local y más en MH Equipamientos.",
  alternates: { canonical: "/preguntas-frecuentes" },
};

const horariosTexto = BUSINESS_HOURS.map((h) => `${h.dias} de ${h.horario}`).join(", ");

const FAQ_ITEMS: AccordionItemData[] = [
  {
    question: "¿Cómo hago para comprar?",
    answer:
      "Elegís el o los productos que necesitás, los agregás al carrito y hacés clic en el botón para cotizar por WhatsApp. Ahí nuestro equipo de ventas se contacta directo con vos por ese medio para coordinar el pago y la entrega.",
  },
  {
    question: "¿Qué medios de pago aceptan?",
    answer:
      "Aceptamos todas las tarjetas, cheques hasta 210 días, y tenés descuento por pago contado. También ofrecemos la posibilidad de financiación semanal o mensual, y descuento extra si comprás por cantidad.",
  },
  {
    question: "¿Hacen envíos a mi localidad? ¿Tiene costo?",
    answer:
      "Sí. Tenemos envío gratis dentro de un radio de 120 km de Carhué, y entrega a convenir para localidades más lejanas, hasta 450 km. Podés ver el mapa de cobertura completo en la home.",
  },
  {
    question: "¿Puedo retirar en el local? ¿Cuáles son los horarios?",
    answer: `Sí, podés retirar tu compra en nuestro local de ${BUSINESS_ADDRESS}. Atendemos ${horariosTexto}.`,
  },
  {
    question: "¿Hacen factura A o B?",
    answer: "Sí, emitimos factura A y factura B.",
  },
  {
    question: "¿Qué pasa si el producto llega con alguna falla?",
    answer:
      "Por el momento no tenemos un proceso formal armado para esto, pero si te llega algo con un problema escribinos por WhatsApp y lo resolvemos directamente con vos.",
  },
  {
    question: "¿Los equipos son todos nuevos o también venden usados?",
    answer: "Todos nuestros equipos son nuevos.",
  },
  {
    question: "¿Instalan el equipo que compro?",
    answer:
      "No, no realizamos instalación. El equipo llega listo para que lo instale el comprador o un técnico de tu confianza.",
  },
  {
    question: "¿Puedo cambiar o devolver un producto?",
    answer:
      "Por el momento no contamos con una política formal de cambios o devoluciones. Si tenés algún inconveniente con tu compra, escribinos por WhatsApp y vemos cómo ayudarte.",
  },
];

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
