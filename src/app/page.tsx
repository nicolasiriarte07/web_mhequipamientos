import { getCategories } from "@/lib/data";
import { CategoryCard } from "@/components/CategoryCard";
import { SearchBar } from "@/components/SearchBar";

export const revalidate = 60;

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <div>
      <section className="mx-auto max-w-3xl px-4 pt-16 pb-10 text-center sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Equipamiento comercial
        </h1>
        <p className="mt-3 text-lg text-gray-500">Sabemos lo que tu negocio necesita</p>

        <div className="mt-8">
          <SearchBar />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
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
    </div>
  );
}
