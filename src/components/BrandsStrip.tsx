export function BrandsStrip({ brands }: { brands: string[] }) {
  if (brands.length === 0) return null;

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-center text-xl font-bold text-gray-900">Marcas que trabajamos</h2>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {brands.map((brand) => (
          <span
            key={brand}
            className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}
