// Marcas simplificadas (no los logos oficiales) para dar una referencia
// visual rápida de qué tarjetas se aceptan, sin usar artes de marca.

export function VisaMark({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded bg-[#1A1F71] px-1.5 py-0.5 text-[10px] font-black italic tracking-tight text-white ${className ?? ""}`}
    >
      VISA
    </span>
  );
}

export function MastercardMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 22" className={className} aria-hidden>
      <rect width="36" height="22" rx="4" fill="#F3F4F6" />
      <circle cx="15" cy="11" r="7" fill="#EB001B" />
      <circle cx="21" cy="11" r="7" fill="#F79E1B" />
      <path
        d="M18 5.7a7 7 0 0 1 0 10.6 7 7 0 0 1 0-10.6Z"
        fill="#FF5F00"
      />
    </svg>
  );
}
