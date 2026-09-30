import { TESTIMONIALS } from "@/lib/testimonials";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1.5}
          className="h-4 w-4 text-amber-400"
          aria-hidden
        >
          <path d="M10 1.5 12.47 6.9l5.94.7-4.42 4.06 1.18 5.86L10 14.7l-5.17 2.82 1.18-5.86L1.6 7.6l5.94-.7Z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-center text-xl font-bold text-gray-900">Lo que dicen nuestros clientes</h2>
      <p className="mt-1 text-center text-sm text-gray-500">
        Comercios de toda la región nos eligen
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <div key={`${t.name}-${t.city}`} className="flex flex-col gap-3 rounded-xl bg-gray-50 p-5">
            <Stars rating={t.rating} />
            <p className="text-sm leading-relaxed text-gray-600">&ldquo;{t.quote}&rdquo;</p>
            <p className="mt-auto text-sm font-semibold text-gray-900">
              {t.name} <span className="font-normal text-gray-400">· {t.city}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
