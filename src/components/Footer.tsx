import Image from "next/image";

const INSTAGRAM_URL = "https://www.instagram.com/equipamientos.mh/";
const WHATSAPP_URL = "https://wa.me/5492923507782";
const MUNDO_HOGAR_URL = "https://www.mundohogar.com.ar";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
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
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                  <path d="M12.04 2.5c-5.26 0-9.54 4.28-9.54 9.54 0 1.68.45 3.32 1.3 4.76L2.5 21.5l4.85-1.27a9.5 9.5 0 0 0 4.69 1.25h.01c5.26 0 9.54-4.28 9.54-9.54s-4.28-9.44-9.55-9.44Zm0 17.46h-.01a7.9 7.9 0 0 1-4.03-1.1l-.29-.17-3 .79.8-2.92-.19-.3a7.88 7.88 0 0 1-1.21-4.22c0-4.36 3.55-7.91 7.93-7.91 2.12 0 4.1.82 5.6 2.32a7.86 7.86 0 0 1 2.32 5.6c0 4.36-3.56 7.91-7.92 7.91Zm4.34-5.93c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.92-1.18-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
                </svg>
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
