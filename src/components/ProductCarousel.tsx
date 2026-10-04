import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";

export function ProductCarousel({
  title,
  subtitle,
  products,
}: {
  title: string;
  subtitle?: string;
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>

      <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:-mx-8 sm:gap-6 sm:px-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[calc(50%-8px)] shrink-0 snap-start sm:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
