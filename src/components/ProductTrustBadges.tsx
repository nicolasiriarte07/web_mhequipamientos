import type { Product } from "@/lib/types";

const items = [
  {
    label: "Financiación disponible",
    icon: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  },
  {
    label: "Garantía oficial",
    icon: <path d="M12 2 3 6v6c0 5 3.8 8.7 9 10 5.2-1.3 9-5 9-10V6l-9-4Z M9 12l2 2 4-4" />,
  },
  {
    label: "Envío a todo el país",
    icon: (
      <path d="M3 3h13v13H3z M16 8h4l3 3v5h-7V8Z M6.5 20.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    ),
  },
];

export function ProductTrustBadges({ product }: { product: Product }) {
  return (
    <div className="grid grid-cols-1 gap-3 border-t border-gray-100 pt-4 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2 text-xs text-gray-600">
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
            {item.icon}
          </svg>
          {item.label}
        </div>
      ))}

      <div className="flex items-center gap-2 text-xs font-medium sm:col-span-3">
        <span
          className={`h-2 w-2 rounded-full ${product.disponible ? "bg-green-600" : "bg-gray-400"}`}
        />
        <span className={product.disponible ? "text-green-700" : "text-gray-500"}>
          {product.disponible ? "En stock" : "Sin stock"}
        </span>
        <span className="text-gray-300">·</span>
        <span className="text-gray-500">Código {product.id}</span>
      </div>
    </div>
  );
}
