"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function Header() {
  const { count } = useCart();

  return (
    <header className="bg-brand text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="MH Equipamientos"
            width={200}
            height={75}
            priority
            className="h-10 w-auto sm:h-12"
          />
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
