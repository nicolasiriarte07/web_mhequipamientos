import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductById, getRelatedProducts } from "@/lib/data";
import { ProductPurchasePanel } from "@/components/ProductPurchasePanel";
import { ProductTrustBadges } from "@/components/ProductTrustBadges";
import { ProductGrid } from "@/components/ProductGrid";
import { parseSpecLines } from "@/lib/specs";

export const revalidate = 30;

const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isFinite(productId)) notFound();

  const product = await getProductById(productId);
  if (!product) notFound();

  const related = product.categoria_id
    ? await getRelatedProducts(product.categoria_id, product.id)
    : [];

  const specLines = product.descripcion ? parseSpecLines(product.descripcion) : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/productos" className="hover:text-brand">
          Catálogo
        </Link>
        {product.categorias && (
          <>
            {" / "}
            <Link
              href={`/productos?categoria=${product.categorias.id}`}
              className="hover:text-brand"
            >
              {product.categorias.nombre}
            </Link>
          </>
        )}
        {" / "}
        <span className="text-gray-700">{product.titulo}</span>
      </nav>

      <div className="grid gap-8 rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8">
        <div className="group relative h-72 w-full overflow-hidden rounded-xl bg-gray-100 sm:h-96">
          {product.imagen_url ? (
            <Image
              src={product.imagen_url}
              alt={product.titulo}
              fill
              className="object-contain p-6 transition-transform duration-300 group-hover:scale-110"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              Sin imagen
            </div>
          )}
          {product.entrega_inmediata && (
            <span className="absolute left-4 top-4 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
              Entrega inmediata
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {product.categorias && (
            <Link
              href={`/productos?categoria=${product.categorias.id}`}
              className="text-xs font-semibold uppercase tracking-wide text-brand hover:underline"
            >
              {product.categorias.nombre}
            </Link>
          )}

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{product.titulo}</h1>

          {product.marca && (
            <span className="w-fit rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white">
              {product.marca}
            </span>
          )}

          <span className="text-3xl font-bold text-gray-900">
            {product.precio != null ? priceFormatter.format(product.precio) : "Consultar"}
          </span>

          <ProductPurchasePanel product={product} />

          <ProductTrustBadges product={product} />
        </div>
      </div>

      {specLines.length > 0 && (
        <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Especificaciones</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {specLines.map((line, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                  aria-hidden
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {line}
              </li>
            ))}
          </ul>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-8">
          <ProductGrid title="También te puede interesar" products={related} />
        </div>
      )}
    </div>
  );
}
