import type { Metadata } from "next";
import { getCategories, getProducts, getBrands, PRODUCTS_PAGE_SIZE } from "@/lib/data";
import { SearchBar } from "@/components/SearchBar";
import { ProductFilters } from "@/components/ProductFilters";
import { ProductCard } from "@/components/ProductCard";
import { Pagination } from "@/components/Pagination";
import { SITE_URL } from "@/lib/business";

export const revalidate = 30;

type SearchParams = {
  q?: string;
  categoria?: string;
  marca?: string;
  orden?: string;
  inmediata?: string;
  pagina?: string;
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const params = await searchParams;
  const categoryId = params.categoria ? Number(params.categoria) : undefined;
  const categories = categoryId ? await getCategories() : [];
  const category = categoryId ? categories.find((c) => c.id === categoryId) : undefined;

  const title = category ? category.nombre : "Catálogo";
  const description = category
    ? `Comprá ${category.nombre.toLowerCase()} en MH Equipamientos: equipamiento comercial y gastronómico en Carhué, con envíos a toda la región y financiación en cuotas.`
    : "Catálogo completo de equipamiento comercial y gastronómico: heladeras, exhibidoras, cocinas, balanzas y más. Envíos a toda la región y financiación en cuotas.";

  // Los filtros de búsqueda/marca/disponibilidad generan muchas combinaciones
  // de poco valor para indexar (resultados angostos o repetidos); el canonical
  // siempre apunta a la versión "limpia" por categoría, y esas combinaciones
  // puntuales van con noindex para no diluir el catálogo en los buscadores.
  const isFiltered = Boolean(params.q || params.marca || params.inmediata === "1");
  const page = params.pagina ? Number(params.pagina) : 1;
  const canonicalParams = new URLSearchParams();
  if (categoryId) canonicalParams.set("categoria", String(categoryId));
  if (page > 1 && !isFiltered) canonicalParams.set("pagina", String(page));
  const canonicalQuery = canonicalParams.toString();

  return {
    title,
    description,
    alternates: { canonical: `/productos${canonicalQuery ? `?${canonicalQuery}` : ""}` },
    robots: isFiltered ? { index: false, follow: true } : undefined,
  };
}

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const sort =
    params.orden === "price-asc" || params.orden === "price-desc" ? params.orden : "none";
  const categoryId = params.categoria ? Number(params.categoria) : undefined;
  const pageParam = params.pagina ? Number(params.pagina) : 1;
  const currentPage = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const [categories, brands, { products, total }] = await Promise.all([
    getCategories(),
    getBrands(),
    getProducts({
      search: params.q,
      categoryId: Number.isFinite(categoryId) ? categoryId : undefined,
      brand: params.marca || undefined,
      immediateOnly: params.inmediata === "1",
      sort,
      page: currentPage,
    }),
  ]);

  const activeCategory = categories.find((c) => c.id === categoryId);
  const totalPages = Math.max(1, Math.ceil(total / PRODUCTS_PAGE_SIZE));
  const rangeStart = total === 0 ? 0 : (currentPage - 1) * PRODUCTS_PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PRODUCTS_PAGE_SIZE, total);

  function buildHref(page: number) {
    const sp = new URLSearchParams();
    if (params.q) sp.set("q", params.q);
    if (params.categoria) sp.set("categoria", params.categoria);
    if (params.marca) sp.set("marca", params.marca);
    if (params.orden) sp.set("orden", params.orden);
    if (params.inmediata) sp.set("inmediata", params.inmediata);
    if (page > 1) sp.set("pagina", String(page));
    const qs = sp.toString();
    return `/productos${qs ? `?${qs}` : ""}`;
  }

  const itemListJsonLd =
    products.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: products.map((product, i) => ({
            "@type": "ListItem",
            position: (currentPage - 1) * PRODUCTS_PAGE_SIZE + i + 1,
            url: `${SITE_URL}/productos/${product.id}`,
            name: product.titulo,
          })),
        }
      : null;

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10">
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {activeCategory ? activeCategory.nombre : "Catálogo completo"}
        </h1>
        {activeCategory?.descripcion && (
          <p className="mt-1 text-sm text-gray-500">{activeCategory.descripcion}</p>
        )}
      </div>

      <div className="mb-6">
        <SearchBar initialValue={params.q ?? ""} />
      </div>

      <div className="mb-6">
        <ProductFilters categories={categories} brands={brands} />
      </div>

      <p className="mb-4 text-sm text-gray-500">
        {totalPages > 1 ? (
          <>
            Mostrando{" "}
            <span className="font-semibold text-gray-800">
              {rangeStart}–{rangeEnd}
            </span>{" "}
            de <span className="font-semibold text-gray-800">{total}</span> productos
          </>
        ) : (
          <>
            Mostrando <span className="font-semibold text-gray-800">{total}</span> productos
          </>
        )}
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

      <Pagination currentPage={currentPage} totalPages={totalPages} buildHref={buildHref} />
    </div>
  );
}
