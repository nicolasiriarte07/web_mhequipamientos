import {
  BUSINESS_CITY,
  BUSINESS_COUNTRY,
  BUSINESS_NAME,
  BUSINESS_OPENING_HOURS,
  BUSINESS_REGION,
  BUSINESS_STREET_ADDRESS,
  INSTAGRAM_URL,
  SITE_URL,
} from "@/lib/business";
import { PHONE_TEL } from "@/lib/contact";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    telephone: PHONE_TEL,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_STREET_ADDRESS,
      addressLocality: BUSINESS_CITY,
      addressRegion: BUSINESS_REGION,
      addressCountry: BUSINESS_COUNTRY,
    },
    openingHoursSpecification: BUSINESS_OPENING_HOURS.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [INSTAGRAM_URL],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BUSINESS_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/productos?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

// Fecha hasta la que vale el precio publicado, para el campo priceValidUntil
// de los datos estructurados de producto (Google lo recomienda en Offer).
// Vive fuera del componente de página para que el linter de pureza de React
// no se queje de llamar a Date() "durante el render".
export function priceValidUntil() {
  return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
