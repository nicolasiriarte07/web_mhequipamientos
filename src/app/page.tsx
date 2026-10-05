import Image from "next/image";
import Link from "next/link";
import {
  getCategories,
  getMonthlyOffers,
  getBriketMaster,
  getBrands,
  getProductsByCategorySlug,
  getProductsByCategorySlugs,
} from "@/lib/data";
import { CategoryCard } from "@/components/CategoryCard";
import { SearchBar } from "@/components/SearchBar";
import { HAS_HERO_IMAGE, HERO_IMAGE } from "@/lib/heroImage";
import { Highlights } from "@/components/Highlights";
import { BrandsStrip } from "@/components/BrandsStrip";
import { BusinessTypes } from "@/components/BusinessTypes";
import { BusinessProductTabs } from "@/components/BusinessProductTabs";
import { PaymentMethods } from "@/components/PaymentMethods";
import { Testimonials } from "@/components/Testimonials";
import { ShippingCoverage } from "@/components/ShippingCoverage";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductCarousel } from "@/components/ProductCarousel";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { BUSINESS_PRODUCT_TABS } from "@/lib/businessProductTabs";
import type { Product } from "@/lib/types";

const TRUST_STRIP_ITEMS = [
  "Más de 30 años en el rubro",
  "Envíos a toda la región",
  "Financiación hasta el 100%",
  "Atención directa por WhatsApp",
];

export const revalidate = 60;

export default async function HomePage() {
  const [
    categories,
    offers,
    briketMaster,
    brands,
    gastronomiaProducts,
    alimentosProducts,
    businessTabProducts,
  ] = await Promise.all([
    getCategories(),
    getMonthlyOffers(),
    getBriketMaster(),
    getBrands(),
    getProductsByCategorySlug("gastronomia", 12),
    getProductsByCategorySlug("alimentos", 12),
    Promise.all(
      BUSINESS_PRODUCT_TABS.map((tab) => getProductsByCategorySlugs([...tab.categorySlugs], 8))
    ),
  ]);

  const productsByBusinessTab: Record<string, Product[]> = Object.fromEntries(
    BUSINESS_PRODUCT_TABS.map((tab, i) => [tab.slug, businessTabProducts[i]])
  );

  const heroContent = (
    <div
      className={`relative mx-auto max-w-3xl px-4 pb-10 pt-16 text-center sm:px-6 ${
        HAS_HERO_IMAGE ? "flex min-h-[380px] flex-col justify-center" : ""
      }`}
    >
      <h1 className="flex justify-center">
        {HAS_HERO_IMAGE ? (
          <Image
            src="/logo.png"
            alt="MH Equipamientos"
            width={320}
            height={120}
            className="h-16 w-auto sm:h-20"
          />
        ) : (
          <span className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            MH EQUIPAMIENTOS
          </span>
        )}
      </h1>
      <p className={`mt-3 text-lg ${HAS_HERO_IMAGE ? "text-white/85" : "text-gray-500"}`}>
        Acompañamos el crecimiento de tu negocio
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/productos"
          className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-dark shadow-sm hover:bg-white/90"
        >
          Ver catálogo completo
        </Link>
        <a
          href={whatsappUrl("Hola! Quiero asesorarme sobre equipamiento para mi negocio.")}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold hover:bg-white/10 ${
            HAS_HERO_IMAGE ? "border-white/60 text-white" : "border-brand text-brand"
          }`}
        >
          <WhatsAppIcon className="h-4 w-4" />
          Hablar con un asesor
        </a>
      </div>

      <div className="mt-8 hidden sm:block">
        <SearchBar />
      </div>
    </div>
  );

  return (
    <div>
      {HAS_HERO_IMAGE ? (
        <section className="mx-auto max-w-[1600px] px-4 pt-8 sm:px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src={HERO_IMAGE}
              alt="MH Equipamientos"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/85 via-brand-dark/70 to-brand-dark/40" />
            {heroContent}
          </div>
        </section>
      ) : (
        <section>{heroContent}</section>
      )}

      <section className="mx-auto max-w-[1600px] px-4 pt-6 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl bg-white px-6 py-4 shadow-sm">
          {TRUST_STRIP_ITEMS.map((item) => (
            <span key={item} className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0 text-brand"
                aria-hidden
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pt-14 sm:px-6 lg:px-10">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Encontrá todo para tu negocio
          </h2>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Explorá nuestras categorías y descubrí el equipamiento ideal para vos.
          </p>
        </div>
        {categories.length === 0 ? (
          <p className="text-center text-gray-500">
            Todavía no hay categorías cargadas en Supabase.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pt-14 sm:px-6 lg:px-10">
        <RecentlyViewed />
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pt-14 sm:px-6 lg:px-10">
        <ProductGrid
          title="Ofertas que no te podés perder"
          subtitle="Productos con entrega inmediata, directo a tu negocio"
          products={offers}
        />
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pt-14 sm:px-6 lg:px-10">
        <BusinessProductTabs productsByTab={productsByBusinessTab} />
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pt-14 sm:px-6 lg:px-10">
        <Highlights />
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pt-14 sm:px-6 lg:px-10">
        <ProductGrid
          title="Exhibidoras Briket Master"
          subtitle="La vidriera perfecta para tu local"
          products={briketMaster}
        />
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pt-14 sm:px-6 lg:px-10">
        <ProductCarousel
          title="Productos de Gastronomía"
          subtitle="Equipamiento profesional para tu cocina"
          products={gastronomiaProducts}
        />
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pt-14 sm:px-6 lg:px-10">
        <ProductCarousel
          title="Productos de Alimentos"
          subtitle="Todo para procesar y conservar"
          products={alimentosProducts}
        />
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pt-14 sm:px-6 lg:px-10">
        <BrandsStrip brands={brands} />
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pt-14 sm:px-6 lg:px-10">
        <BusinessTypes />
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pt-14 sm:px-6 lg:px-10">
        <PaymentMethods />
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pt-14 sm:px-6 lg:px-10">
        <ShippingCoverage />
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pt-14 sm:px-6 lg:px-10">
        <Testimonials />
      </section>

      <div className="pb-16" />
    </div>
  );
}
