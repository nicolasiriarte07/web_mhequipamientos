import type { Metadata } from "next";
import { BUSINESS_ADDRESS, BUSINESS_HOURS } from "@/lib/business";
import { PaymentMethods } from "@/components/PaymentMethods";
import { Testimonials } from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Nosotros | MH Equipamientos",
  description:
    "Conocé la historia de Mundo Hogar y MH Equipamientos: más de 30 años acompañando a las familias y comercios de Carhué y la región.",
};

const TIMELINE = [
  {
    year: "1994",
    title: "Los comienzos en Carhué",
    text:
      "Mundo Hogar abre sus puertas en Carhué con un pequeño local dedicado a artículos para el hogar, impulsado por las ganas de crecer junto a la comunidad.",
  },
  {
    year: "1998",
    title: "Primera mudanza",
    text:
      "El crecimiento de la demanda nos lleva a un local más grande dentro de la misma ciudad, ampliando el surtido de productos y marcas.",
  },
  {
    year: "2003",
    title: "Llegamos a Rivera",
    text:
      "Abrimos nuestra primera sucursal fuera de Carhué, en Rivera, llevando la propuesta de Mundo Hogar a más familias de la región.",
  },
  {
    year: "2006",
    title: "Sucursal en Salliqueló",
    text:
      "Seguimos expandiéndonos con la apertura de una nueva sucursal en Salliqueló, consolidando presencia en el sudoeste bonaerense.",
  },
  {
    year: "2013",
    title: "Un tercer local",
    text:
      "Abrimos un tercer punto de venta, reforzando la atención a los clientes de siempre y sumando nuevas líneas de productos.",
  },
  {
    year: "2017",
    title: "Bahía Blanca",
    text:
      "Damos un salto importante con la apertura de una sucursal en Bahía Blanca, llegando a un público aún más amplio.",
  },
  {
    year: "2020",
    title: "El salto a lo digital",
    text:
      "Ante los desafíos del contexto, dimos el salto al comercio digital para seguir cerca de nuestros clientes, sin importar la distancia.",
  },
  {
    year: "2021",
    title: "Nuestro local actual",
    text:
      "Inauguramos nuestro local de 450 m² en Carhué, el espacio más grande de nuestra historia, pensado para ofrecer una mejor experiencia de compra.",
  },
  {
    year: "2025",
    title: "Nace MH Equipamientos",
    text:
      "Lanzamos MH Equipamientos, nuestra división dedicada al equipamiento comercial y gastronómico, para acompañar el crecimiento de los negocios de la región.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Desde 1994</p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
          Más de 30 años creciendo junto a vos
        </h1>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600">
          <p>
            MH Equipamientos es una división de Mundo Hogar, una empresa familiar nacida en Carhué
            que desde hace más de tres décadas acompaña a las familias y los comercios de la
            región. Hoy llevamos esa misma experiencia al equipamiento comercial y gastronómico,
            para que equipar un negocio no sea un dolor de cabeza.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-bold text-gray-900 sm:text-xl">Nuestra Historia</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          Un recorrido de crecimiento constante, paso a paso, siempre cerca de nuestros clientes.
        </p>

        <ol className="mt-8 space-y-8 border-l-2 border-brand/20 pl-6">
          {TIMELINE.map((item) => (
            <li key={item.year} className="relative">
              <span className="absolute -left-[31px] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-brand ring-4 ring-white" />
              <span className="text-sm font-bold text-brand">{item.year}</span>
              <h3 className="mt-1 text-base font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 rounded-xl bg-brand/5 p-5">
          <h3 className="text-base font-bold text-brand-dark">Hoy seguimos creciendo</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            Cada etapa de nuestra historia nos trajo hasta acá: una empresa familiar que sigue
            creciendo de la mano de la comunidad que la eligió desde el primer día. Con MH
            Equipamientos abrimos un nuevo capítulo, enfocado en acompañar a los comercios y
            emprendimientos gastronómicos de toda la región con el mismo compromiso de siempre.
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
