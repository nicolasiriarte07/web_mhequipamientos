import type { Metadata } from "next";
import { BUSINESS_ADDRESS, BUSINESS_HOURS } from "@/lib/business";
import { PaymentMethods } from "@/components/PaymentMethods";
import { Testimonials } from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Nosotros | MH Equipamientos",
  description:
    "Conocé MH Equipamientos: equipamiento comercial y gastronómico en Carhué, provincia de Buenos Aires, con financiación y envíos a toda la región.",
};

export default function NosotrosPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Nosotros</h1>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600">
          <p>
            MH Equipamientos nació en Carhué con un objetivo simple: que equipar un comercio no
            sea un dolor de cabeza. Somos una división de Mundo Hogar, y desde nuestra base en el
            corazón de la provincia de Buenos Aires acompañamos a kioscos, supermercados, bares,
            restaurantes, panaderías, hoteles y emprendimientos de toda la región en cada etapa de
            su crecimiento.
          </p>
          <p>
            Trabajamos con las mejores marcas del mercado (Kretz, Turboblender, Solreal, Santini,
            Bestcold, Inelro, Briket y más) y ofrecemos asesoramiento personalizado para que cada
            cliente encuentre el equipo justo para su negocio, no el más caro ni el más barato: el
            que mejor le sirve.
          </p>
          <p>
            Financiamos cada compra con múltiples formas de pago, hacemos envíos a toda la zona y
            brindamos soporte directo por WhatsApp antes, durante y después de cada venta.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
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
      </div>

      <div className="mt-8">
        <PaymentMethods />
      </div>

      <div className="mt-8">
        <Testimonials />
      </div>
    </div>
  );
}
