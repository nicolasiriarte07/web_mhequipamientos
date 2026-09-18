import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/lib/data";
import { AddToCartButton } from "@/components/AddToCartButton";

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
        <div className="relative h-72 w-full rounded-xl bg-gray-100 sm:h-96">
          {product.imagen_url ? (
            <Image
              src={product.imagen_url}
              alt={product.titulo}
              fill
              className="object-contain p-6"
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
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{product.titulo}</h1>

          {product.marca && (
            <span className="w-fit rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white">
              {product.marca}
            </span>
          )}

          {product.descripcion && (
            <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">
              {product.descripcion}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between gap-4 border-t border-gray-100 pt-6">
            <span className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {product.precio != null ? priceFormatter.format(product.precio) : "Consultar"}
            </span>
            <AddToCartButton
              product={product}
              className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
