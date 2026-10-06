import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductById, getRelatedProducts } from "@/lib/data";
import { ProductGallery } from "@/components/ProductGallery";
import { InstallmentOptions } from "@/components/InstallmentOptions";
import { ProductPurchasePanel } from "@/components/ProductPurchasePanel";
import { ProductTrustBadges } from "@/components/ProductTrustBadges";
import { ProductGrid } from "@/components/ProductGrid";
import { ShareButton } from "@/components/ShareButton";
import { RecordRecentlyViewed } from "@/components/RecordRecentlyViewed";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { StickyPurchaseBar } from "@/components/StickyPurchaseBar";
import { parseProductContent } from "@/lib/specs";
import { BUSINESS_NAME, SITE_URL } from "@/lib/business";
import { breadcrumbJsonLd, priceValidUntil } from "@/lib/structuredData";

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

  const { description: proseDescription, specLines } = product.descripcion
    ? parseProductContent(product.descripcion)
    : { description: null, specLines: [] };
  const productUrl = `${SITE_URL}/productos/${product.id}`;

  const images = [
    ...(product.imagen_url ? [product.imagen_url] : []),
    ...(product.producto_imagenes ?? [])
      .slice()
      .sort((a, b) => a.orden - b.orden)
      .map((img) => img.url),
  ].filter((url, i, arr) => arr.indexOf(url) === i);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.titulo,
    description: product.descripcion ?? undefined,
    image: images.length > 0 ? images : undefined,
    sku: String(product.id),
    category: product.categorias?.nombre ?? undefined,
    brand: product.marca ? { "@type": "Brand", name: product.marca } : undefined,
    offers:
      product.precio != null
        ? {
            "@type": "Offer",
            url: productUrl,
            priceCurrency: "ARS",
            price: product.precio,
            priceValidUntil: priceValidUntil(),
            itemCondition: "https://schema.org/NewCondition",
            availability: product.disponible
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            seller: { "@type": "Organization", name: BUSINESS_NAME, url: SITE_URL },
          }
        : undefined,
  };

  const breadcrumb = breadcrumbJsonLd([
    { name: "Catálogo", url: `${SITE_URL}/productos` },
    ...(product.categorias
      ? [
          {
            name: product.categorias.nombre,
            url: `${SITE_URL}/productos?categoria=${product.categorias.id}`,
          },
        ]
      : []),
    { name: product.titulo, url: productUrl },
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 pb-28 sm:px-6 sm:pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
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
        <ProductGallery
          images={images}
          alt={product.titulo}
          badge={product.entrega_inmediata ? "Entrega inmediata" : undefined}
        />

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

          <div className="flex flex-col gap-1">
            {product.precio != null && (
              <span className="w-fit rounded-full bg-brand/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-brand-dark">
                Precio contado
              </span>
            )}
            <span className="text-4xl font-extrabold text-brand-dark">
              {product.precio != null ? priceFormatter.format(product.precio) : "Consultar"}
            </span>
          </div>

          {product.precio != null && <InstallmentOptions precio={product.precio} />}

          <ProductPurchasePanel product={product} />

          <ProductTrustBadges product={product} />
        </div>
      </div>

      {proseDescription && (
        <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-gray-900">Descripción</h2>
          <div className="mt-4 flex flex-col gap-3 border-l-4 border-brand/25 bg-brand/5 py-3 pl-5 pr-4 text-base leading-relaxed text-gray-700">
            {proseDescription
              .split(/\n+/)
              .map((p) => p.trim())
              .filter(Boolean)
              .map((paragraph, i) => {
                if (i !== 0) return <p key={i}>{paragraph}</p>;
                const match = paragraph.match(/^(.*?[.!?])\s+(.*)$/);
                if (!match) return <p key={i}>{paragraph}</p>;
                return (
                  <p key={i}>
                    <strong className="font-semibold text-gray-900">{match[1]}</strong>{" "}
                    {match[2]}
                  </p>
                );
              })}
          </div>
        </div>
      )}

      {specLines.length > 0 && (
        <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-gray-900">Especificaciones</h2>
          <p className="mt-1 text-sm text-gray-500">Lo que incluye este equipo</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {specLines.map((line, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl bg-gray-50 p-3.5 text-sm leading-relaxed text-gray-700"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                    aria-hidden
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
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

      <div className="mt-8">
        <RecentlyViewed excludeId={product.id} />
      </div>

      <StickyPurchaseBar product={product} anchorId="purchase-panel" />
    </div>
  );
}
