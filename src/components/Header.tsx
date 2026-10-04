"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { SearchBar } from "@/components/SearchBar";
import { getCategoryImage } from "@/lib/categoryImages";
import type { Category } from "@/lib/types";

export function Header({ categories }: { categories: Category[] }) {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative bg-brand text-white">
      <div className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <div className="relative justify-self-start">
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
              <div className="flex flex-col py-1">
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

              <div className="border-t border-gray-100 px-4 pb-2 pt-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Más información
                </span>
              </div>
              <div className="flex flex-col pb-2">
                <Link
                  href="/nosotros"
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-brand/5 hover:text-brand"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 shrink-0 text-brand"
                    aria-hidden
                  >
                    <path d="M12 8v4l3 3" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                  <span className="font-medium">Nuestra Historia</span>
                </Link>
                <Link
                  href="/contacto"
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-brand/5 hover:text-brand"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 shrink-0 text-brand"
                    aria-hidden
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
                  </svg>
                  <span className="font-medium">Contacto</span>
                </Link>
              </div>
            </div>
          )}
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

        <div className="flex items-center justify-self-end gap-3">
          <Link
            href="/"
            aria-label="Ir al inicio"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/40 hover:bg-white/10"
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
            className="relative flex items-center gap-2 rounded-lg border border-white/40 px-3 py-2 text-sm font-medium hover:bg-white/10"
          >
            Carrito
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
