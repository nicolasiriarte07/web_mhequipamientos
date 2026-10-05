import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS_ADDRESS, BUSINESS_HOURS } from "@/lib/business";
import { whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { ShippingCoverage } from "@/components/ShippingCoverage";
import { QuoteRequestForm } from "@/components/QuoteRequestForm";

const INSTAGRAM_URL = "https://www.instagram.com/equipamientos.mh/";

export const metadata: Metadata = {
  title: "Contacto | MH Equipamientos",
  description:
    "Contactate con MH Equipamientos en Carhué, provincia de Buenos Aires: dirección, horarios, WhatsApp e Instagram.",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Contacto</h1>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          Estamos para ayudarte a equipar tu negocio. Escribinos por WhatsApp, seguinos en
          Instagram o visitanos en nuestro local en Carhué.
        </p>

        <a
          href={whatsappUrl("Hola! Quiero hacer una consulta sobre sus productos.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Escribinos por WhatsApp
        </a>
      </div>

      <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-bold text-gray-900 sm:text-xl">Pedí tu cotización</h2>
        <p className="mt-1 text-sm text-gray-500">
          Dejanos tus datos y te contactamos a la brevedad, sin compromiso.
        </p>
        <div className="mt-6">
          <QuoteRequestForm />
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">Dónde estamos</h2>
          <p className="mt-4 flex items-start gap-2 text-sm text-gray-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 h-5 w-5 shrink-0 text-brand"
              aria-hidden
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {BUSINESS_ADDRESS}
          </p>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">Horarios de atención</h2>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            {BUSINESS_HOURS.map((h) => (
              <li key={h.dias} className="flex justify-between gap-4">
                <span className="font-medium text-gray-800">{h.dias}</span>
                <span>{h.horario}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">Seguinos</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-brand"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 shrink-0 text-brand"
                aria-hidden
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
                <path d="M17.5 6.5h.01" />
              </svg>
              @equipamientos.mh
            </a>
            <a
              href={whatsappUrl("Hola! Quiero hacer una consulta sobre sus productos.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-brand"
            >
              <WhatsAppIcon className="h-5 w-5 shrink-0 text-brand" />
              2923-507782
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <ShippingCoverage />
      </div>

      <p className="mt-8 text-center text-sm text-gray-500">
        ¿Querés conocer nuestra historia?{" "}
        <Link href="/nosotros" className="font-medium text-brand hover:underline">
          Conocé más sobre nosotros
        </Link>
      </p>
    </div>
  );
}
