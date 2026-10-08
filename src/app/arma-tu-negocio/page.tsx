import type { Metadata } from "next";
import { getProductsByRubro } from "@/lib/data";
import { BUSINESS_PRODUCT_TABS } from "@/lib/businessProductTabs";
import { ProjectSimulator } from "@/components/ProjectSimulator";
import type { Product } from "@/lib/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Armá tu negocio",
  description:
    "Elegí el rubro de tu negocio, contanos tu presupuesto y te armamos una propuesta de equipamiento a medida en MH Equipamientos.",
  alternates: { canonical: "/arma-tu-negocio" },
};

export default async function ArmaTuNegocioPage() {
  const businessTabProducts = await Promise.all(
    BUSINESS_PRODUCT_TABS.map((tab) => getProductsByRubro(tab.slug))
  );
  const productsByTab: Record<string, Product[]> = Object.fromEntries(
    BUSINESS_PRODUCT_TABS.map((tab, i) => [tab.slug, businessTabProducts[i]])
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Armá tu negocio</h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Contanos sobre tu proyecto y te armamos una propuesta de equipamiento a medida.
        </p>
      </div>

      <ProjectSimulator productsByTab={productsByTab} />
    </div>
  );
}
