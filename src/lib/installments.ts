export const CARD_INSTALLMENTS = [
  { count: 3, multiplier: 1.1 },
  { count: 6, multiplier: 1.15 },
] as const;

export const DEBIT_INSTALLMENT = { count: 3, multiplier: 1.1 } as const;

export function installmentAmount(precio: number, multiplier: number, count: number) {
  return (precio * multiplier) / count;
}
