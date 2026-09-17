import Image from "next/image";
import { getCategories } from "@/lib/data";
import { CategoryCard } from "@/components/CategoryCard";
import { SearchBar } from "@/components/SearchBar";
import { HAS_HERO_IMAGE, HERO_IMAGE } from "@/lib/heroImage";
import { Highlights } from "@/components/Highlights";
import { ShippingCoverage } from "@/components/ShippingCoverage";

export const revalidate = 60;

export default async function HomePage() {
  const categories = await getCategories();

  const heroContent = (
    <div
      className={`relative mx-auto max-w-3xl px-4 pb-10 pt-16 text-center sm:px-6 ${
        HAS_HERO_IMAGE ? "flex min-h-[380px] flex-col justify-center" : ""
      }`}
    >
      <h1
        className={`text-4xl font-extrabold tracking-tight sm:text-5xl ${
          HAS_HERO_IMAGE ? "text-white" : "text-gray-900"
        }`}
      >
        Equipamiento comercial
      </h1>
      <p className={`mt-3 text-lg ${HAS_HERO_IMAGE ? "text-white/85" : "text-gray-500"}`}>
        Sabemos lo que tu negocio necesita
      </p>

      <div className="mt-8 hidden sm:block">
        <SearchBar />
      </div>
    </div>
  );

  return (
    <div>
      {HAS_HERO_IMAGE ? (
        <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
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

      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <Highlights />
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        {categories.length === 0 ? (
          <p className="text-center text-gray-500">
            Todavía no hay categorías cargadas en Supabase.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6">
        <ShippingCoverage />
      </section>
    </div>
  );
}
