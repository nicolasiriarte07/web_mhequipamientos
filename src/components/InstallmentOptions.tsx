import { CARD_INSTALLMENTS, DEBIT_INSTALLMENT, installmentAmount } from "@/lib/installments";

const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function InstallmentOptions({ precio }: { precio: number }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Con todas las tarjetas
        </p>
        <ul className="space-y-0.5">
          {CARD_INSTALLMENTS.map(({ count, multiplier }) => (
            <li key={count}>
              {count} Cuotas de{" "}
              <span className="font-semibold text-gray-900">
                {priceFormatter.format(installmentAmount(precio, multiplier, count))}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
        <p className="font-semibold">
          {DEBIT_INSTALLMENT.count} cuotas sin interés con débito de{" "}
          {priceFormatter.format(
            installmentAmount(precio, DEBIT_INSTALLMENT.multiplier, DEBIT_INSTALLMENT.count)
          )}
        </p>
      </div>
    </div>
  );
}
