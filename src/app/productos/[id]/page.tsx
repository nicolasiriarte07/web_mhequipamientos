import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductById, getRelatedProducts } from "@/lib/data";
import { ProductPurchasePanel } from "@/components/ProductPurchasePanel";
import { ProductTrustBadges } from "@/components/ProductTrustBadges";
import { ProductGrid } from "@/components/ProductGrid";
import { ShareButton } from "@/components/ShareButton";
import { RecordRecentlyViewed } from "@/components/RecordRecentlyViewed";
import { StickyPurchaseBar } from "@/components/StickyPurchaseBar";
import { parseSpecLines } from "@/lib/specs";
import { SITE_URL } from "@/lib/business";

export const revalidate = 30;

const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(Number(id));
  if (!product) return {};

  const description = product.descripcion
    ? product.descripcion.replace(/\s+/g, " ").slice(0, 160)
    : `${product.titulo}${product.marca ? ` de ${product.marca}` : ""} en MH Equipamientos.`;

  return {
    title: product.titulo,
    description,
    alternates: { canonical: `/productos/${product.id}` },
    openGraph: {
      title: product.titulo,
      description,
      url: `${SITE_URL}/productos/${product.id}`,
      images: product.imagen_url ? [{ url: product.imagen_url }] : undefined,
    },
  };
}

export default async function ProductoPage({ params }: Params) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isFinite(productId)) notFound();

  const product = await getProductById(productId);
  if (!product) notFound();

  const related = product.categoria_id
    ? await getRelatedProducts(product.categoria_id, product.id)
    : [];

  const specLines = product.descripcion ? parseSpecLines(product.descripcion) : [];
  const productUrl = `${SITE_URL}/productos/${product.id}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.titulo,
    description: product.descripcion ?? undefined,
    image: product.imagen_url ?? undefined,
    sku: String(product.id),
    brand: product.marca ? { "@type": "Brand", name: product.marca } : undefined,
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "ARS",
      price: product.precio ?? undefined,
      availability: product.disponible
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 pb-28 sm:px-6 sm:pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RecordRecentlyViewed product={product} />

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

        <div id="purchase-panel" className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            {product.categorias ? (
              <Link
                href={`/productos?categoria=${product.categorias.id}`}
                className="text-xs font-semibold uppercase tracking-wide text-brand hover:underline"
              >
                {product.categorias.nombre}
              </Link>
            ) : (
              <span />
            )}
            <ShareButton title={product.titulo} text={product.titulo} url={productUrl} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{product.titulo}</h1>

          {product.marca && (
            <span className="w-fit rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white">
              {product.marca}
            </span>
          )}

          <span className="text-4xl font-extrabold text-brand-dark">
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

      <StickyPurchaseBar product={product} anchorId="purchase-panel" />
    </div>
  );
}
