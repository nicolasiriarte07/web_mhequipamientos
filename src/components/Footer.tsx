import Image from "next/image";
import Link from "next/link";
import { whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { BUSINESS_ADDRESS, BUSINESS_HOURS } from "@/lib/business";

const INSTAGRAM_URL = "https://www.instagram.com/equipamientos.mh/";
const MUNDO_HOGAR_URL = "https://www.mundohogar.com.ar";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 text-center sm:grid-cols-3 sm:text-left">
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <Image
              src="/logo.png"
              alt="MH Equipamientos"
              width={160}
              height={60}
              className="h-10 w-auto"
            />
            <p className="max-w-xs text-sm text-white/70">
              Equipamiento comercial para tu negocio. Carhué, provincia de Buenos Aires.
            </p>
            <Link
              href="/nosotros"
              className="text-sm font-medium text-white/80 underline underline-offset-2 hover:text-white"
            >
              Conocé más sobre nosotros
            </Link>
          </div>

          <div className="flex flex-col items-center gap-2 sm:items-start">
            <span className="text-sm font-semibold text-white/90">Contacto</span>
            <p className="text-sm text-white/70">{BUSINESS_ADDRESS}</p>
            {BUSINESS_HOURS.map((h) => (
              <p key={h.dias} className="text-sm text-white/70">
                {h.dias}: {h.horario}
              </p>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3 sm:items-start">
            <span className="text-sm font-semibold text-white/90">Seguinos</span>
            <div className="flex gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
                  <path d="M17.5 6.5h.01" />
                </svg>
              </a>
              <a
                href={whatsappUrl("Hola! Quiero hacer una consulta sobre sus productos.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          <p>© {new Date().getFullYear()} MH Equipamientos. Todos los derechos reservados.</p>
          <p>
            Una división de{" "}
            <a
              href={MUNDO_HOGAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white/70 underline underline-offset-2 hover:text-white"
            >
              Mundo Hogar
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
