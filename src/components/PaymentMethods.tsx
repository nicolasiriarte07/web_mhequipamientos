import { PAYMENT_METHODS } from "@/lib/business";

export function PaymentMethods() {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-center text-xl font-bold text-gray-900">Medios de pago</h2>
      <p className="mt-1 text-center text-sm text-gray-500">
        Buscamos la mejor forma de pago para vos
      </p>

      <ul className="mx-auto mt-6 grid max-w-3xl gap-3 sm:grid-cols-2">
        {PAYMENT_METHODS.map((method) => (
          <li key={method} className="flex items-center gap-3 rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
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
              <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z M2 10h20" />
            </svg>
            {method}
          </li>
        ))}
      </ul>
    </div>
  );
}
