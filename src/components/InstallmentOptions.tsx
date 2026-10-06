import { CARD_INSTALLMENTS, DEBIT_INSTALLMENT, installmentAmount } from "@/lib/installments";

const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function InstallmentOptions({ precio }: { precio: number }) {
  const debitAmount = installmentAmount(
    precio,
    DEBIT_INSTALLMENT.multiplier,
    DEBIT_INSTALLMENT.count
  );

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-1.5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-gray-400"
          aria-hidden
        >
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
        </svg>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Con todas las tarjetas
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {CARD_INSTALLMENTS.map(({ count, multiplier }) => (
          <div
            key={count}
            className="rounded-xl border-2 border-brand/25 bg-brand/5 px-3 py-3 text-center"
          >
            <p className="text-2xl font-extrabold leading-none text-brand-dark">{count}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              cuotas de
            </p>
            <p className="mt-1.5 text-lg font-bold text-gray-900">
              {priceFormatter.format(installmentAmount(precio, multiplier, count))}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2.5 rounded-lg bg-green-50 px-3.5 py-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <p className="text-sm text-green-900">
          <span className="font-semibold">{DEBIT_INSTALLMENT.count} cuotas sin interés</span> con
          débito de{" "}
          <span className="font-bold">{priceFormatter.format(debitAmount)}</span>
        </p>
      </div>
    </div>
  );
}
