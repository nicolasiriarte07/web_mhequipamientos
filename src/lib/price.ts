const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function hasPrice(precio: number | null | undefined): precio is number {
  return precio != null && precio > 0;
}

export function formatPrice(precio: number | null | undefined): string {
  if (precio == null) return "Consultar";
  if (precio === 0) return "Pedir cotización";
  return priceFormatter.format(precio);
}
