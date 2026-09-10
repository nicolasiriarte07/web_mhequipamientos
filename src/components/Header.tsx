"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function Header() {
  const { count } = useCart();

  return (
    <header className="bg-brand text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/15 text-sm">
            MH
          </span>
          mhequipamientos
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
    </header>
  );
}
