"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export function Header() {
  const { session, signOut } = useAuth();
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-brand text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/15 text-sm">
            MH
          </span>
          mhequipamientos
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
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

          {session ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-1 text-sm font-medium"
              >
                Bienvenido, {session.user.email}
                <span aria-hidden>▾</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 rounded-lg bg-white py-1 text-sm text-foreground shadow-lg">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      signOut();
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-brand hover:bg-white/90"
            >
              Ingresar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
