import Image from "next/image";
import { getCategories, getMonthlyOffers, getBriketMaster, getBrands } from "@/lib/data";
import { CategoryCard } from "@/components/CategoryCard";
import { SearchBar } from "@/components/SearchBar";
import { HAS_HERO_IMAGE, HERO_IMAGE } from "@/lib/heroImage";
import { Highlights } from "@/components/Highlights";
import { BrandsStrip } from "@/components/BrandsStrip";
import { BusinessTypes } from "@/components/BusinessTypes";
import { PaymentMethods } from "@/components/PaymentMethods";
import { Testimonials } from "@/components/Testimonials";
import { ShippingCoverage } from "@/components/ShippingCoverage";
import { ProductGrid } from "@/components/ProductGrid";
import { RecentlyViewed } from "@/components/RecentlyViewed";

export const revalidate = 60;

export default async function HomePage() {
  const [categories, offers, briketMaster, brands] = await Promise.all([
    getCategories(),
    getMonthlyOffers(),
    getBriketMaster(),
    getBrands(),
  ]);

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
