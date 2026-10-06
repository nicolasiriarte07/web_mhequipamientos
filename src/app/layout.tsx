import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { GoogleAnalyticsPageview } from "@/components/GoogleAnalyticsPageview";
import { MetaPixel } from "@/components/MetaPixel";
import { MetaPixelPageview } from "@/components/MetaPixelPageview";
import { getCategories } from "@/lib/data";
import { BUSINESS_NAME, SITE_URL } from "@/lib/business";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const DESCRIPTION =
  "Equipamiento comercial y gastronómico en Carhué, provincia de Buenos Aires. Acompañamos el crecimiento de tu negocio.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MH Equipamientos | Equipamiento comercial",
    template: "%s | MH Equipamientos",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: BUSINESS_NAME,
    url: SITE_URL,
    title: "MH Equipamientos | Equipamiento comercial",
    description: DESCRIPTION,
    images: [{ url: "/banner/hero.webp", width: 1200, height: 630, alt: BUSINESS_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MH Equipamientos | Equipamiento comercial",
    description: DESCRIPTION,
    images: ["/banner/hero.webp"],
  },
};

export const revalidate = 60;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const categories = await getCategories();

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <GoogleAnalytics />
        <MetaPixel />
        <Suspense fallback={null}>
          <GoogleAnalyticsPageview />
          <MetaPixelPageview />
        </Suspense>
        <Providers>
          <Header categories={categories} />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
