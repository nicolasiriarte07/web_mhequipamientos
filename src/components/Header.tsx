"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { SearchBar } from "@/components/SearchBar";
import type { Category } from "@/lib/types";

export function Header({ categories }: { categories: Category[] }) {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative bg-brand text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-4 sm:px-6">
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
            <div className="absolute left-0 top-full z-20 mt-2 w-56 overflow-hidden rounded-lg bg-white py-1 text-sm text-foreground shadow-lg">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/productos?categoria=${category.id}`}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {category.nombre}
                </Link>
              ))}
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
