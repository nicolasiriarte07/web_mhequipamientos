"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { SearchBar } from "@/components/SearchBar";
import { getCategoryImage } from "@/lib/categoryImages";
import type { Category } from "@/lib/types";

function CategoryLinks({ categories }: { categories: Category[] }) {
  return (
    <div className="flex max-h-80 flex-col overflow-y-auto py-1">
      {categories.map((category) => {
        const image = getCategoryImage(category.nombre);
        return (
          <Link
            key={category.id}
            href={`/productos?categoria=${category.id}`}
            className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-brand/5 hover:text-brand"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
              {image ? (
                <Image
                  src={image}
                  alt=""
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-gray-400"
                  aria-hidden
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                </svg>
              )}
            </span>
            <span className="font-medium">{category.nombre}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function Header({ categories }: { categories: Category[] }) {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative bg-brand text-white">
      <div className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-1 justify-self-start">
          {/* Mobile: hamburguesa con todo el menú adentro */}
          <div className="relative sm:hidden">
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              onBlur={() => setTimeout(() => setMobileMenuOpen(false), 150)}
              aria-label="Abrir menú"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/40 hover:bg-white/10"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>

            {mobileMenuOpen && (
              <div className="absolute left-0 top-full z-20 mt-2 w-72 overflow-hidden rounded-xl bg-white text-sm text-foreground shadow-xl ring-1 ring-black/5">
                <div className="flex flex-col py-1">
                  <Link
                    href="/nosotros"
                    className="px-4 py-2.5 font-semibold text-gray-700 hover:bg-brand/5 hover:text-brand"
                  >
                    Nuestra Historia
                  </Link>
                  <Link
                    href="/contacto"
                    className="px-4 py-2.5 font-semibold text-gray-700 hover:bg-brand/5 hover:text-brand"
                  >
                    Contacto
                  </Link>
                  <Link
                    href="/preguntas-frecuentes"
                    className="px-4 py-2.5 font-semibold text-gray-700 hover:bg-brand/5 hover:text-brand"
                  >
                    Preguntas Frecuentes
                  </Link>
                </div>
                <div className="border-t border-gray-100 px-4 pb-2 pt-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Categorías
                  </span>
                </div>
                <CategoryLinks categories={categories} />
              </div>
            )}
          </div>

          {/* Desktop: dropdown de categorías + links sueltos (sin cambios) */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
              className="flex items-center gap-1.5 rounded-lg border border-white/40 px-3 py-2 text-sm font-medium hover:bg-white/10"
            >
              Categorías
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-4 w-4 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                aria-hidden
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute left-0 top-full z-20 mt-2 w-72 overflow-hidden rounded-xl bg-white text-sm text-foreground shadow-xl ring-1 ring-black/5">
                <div className="px-4 pb-2 pt-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Categorías
                  </span>
                </div>
                <CategoryLinks categories={categories} />
              </div>
            )}
          </div>

          <Link
            href="/nosotros"
            className="hidden rounded-lg px-3 py-2 text-sm font-semibold hover:bg-white/10 sm:block"
          >
            Nuestra Historia
          </Link>
          <Link
            href="/contacto"
            className="hidden rounded-lg px-3 py-2 text-sm font-semibold hover:bg-white/10 sm:block"
          >
            Contacto
          </Link>
        </div>

        <Link href="/" className="flex items-center justify-self-center">
          <Image
            src="/logo.png"
            alt="MH Equipamientos"
            width={200}
            height={75}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <div className="flex items-center justify-self-end gap-2 sm:gap-3">
          <Link
            href="/"
            aria-label="Ir al inicio"
            className="hidden h-10 w-10 items-center justify-center rounded-lg border border-white/40 hover:bg-white/10 sm:flex"
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
              <path d="M3 11.5 12 4l9 7.5" />
              <path d="M5 10v10h14V10" />
              <path d="M9 20v-6h6v6" />
            </svg>
          </Link>

          <Link
            href="/carrito"
            aria-label="Carrito"
            className="relative flex h-10 w-10 items-center justify-center gap-2 rounded-lg border border-white/40 hover:bg-white/10 sm:h-auto sm:w-auto sm:px-3 sm:py-2 sm:text-sm sm:font-medium"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 sm:hidden"
              aria-hidden
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="hidden sm:inline">Carrito</span>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-brand">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="px-4 pb-4 sm:hidden">
        <SearchBar compact />
      </div>
    </header>
  );
}
