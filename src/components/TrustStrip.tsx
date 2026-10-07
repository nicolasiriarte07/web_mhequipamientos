const ITEMS = [
  "Más de 30 años en el rubro",
  "Envíos a toda la región",
  "Financiación hasta el 100%",
  "Atención directa por WhatsApp",
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0 text-brand"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Item({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-gray-700">
      <CheckIcon />
      {text}
    </span>
  );
}

export function TrustStrip() {
  return (
    <div className="rounded-2xl bg-white py-4 shadow-sm">
      {/* Mobile: cinta corriendo en loop */}
      <div className="overflow-hidden sm:hidden">
        <div className="flex w-max animate-[marquee_16s_linear_infinite] gap-10 px-6">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <Item key={i} text={item} />
          ))}
        </div>
      </div>

      {/* Desktop: fila centrada, sin animación */}
      <div className="hidden flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 sm:flex">
        {ITEMS.map((item) => (
          <Item key={item} text={item} />
        ))}
      </div>
    </div>
  );
}
