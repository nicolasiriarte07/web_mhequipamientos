import { getCategories, getProducts, getBrands } from "@/lib/data";
import { SearchBar } from "@/components/SearchBar";
import { ProductFilters } from "@/components/ProductFilters";
import { ProductCard } from "@/components/ProductCard";

export const revalidate = 30;

type SearchParams = {
  q?: string;
  categoria?: string;
  marca?: string;
  orden?: string;
  inmediata?: string;
};

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const sort =
    params.orden === "price-asc" || params.orden === "price-desc" ? params.orden : "none";
  const categoryId = params.categoria ? Number(params.categoria) : undefined;

  const [categories, brands, products] = await Promise.all([
    getCategories(),
    getBrands(),
    getProducts({
      search: params.q,
      categoryId: Number.isFinite(categoryId) ? categoryId : undefined,
      brand: params.marca || undefined,
      immediateOnly: params.inmediata === "1",
      sort,
    }),
  ]);

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mb-6">
        <SearchBar initialValue={params.q ?? ""} />
      </div>

      <div className="mb-6">
        <ProductFilters categories={categories} brands={brands} />
      </div>

      <p className="mb-4 text-sm text-gray-500">
        Mostrando <span className="font-semibold text-gray-800">{products.length}</span>{" "}
        productos
      </p>

      {products.length === 0 ? (
        <p className="py-16 text-center text-gray-500">
          No encontramos productos con esos filtros.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
