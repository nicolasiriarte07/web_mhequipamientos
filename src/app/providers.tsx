"use client";

import { CartProvider } from "@/context/CartContext";
import { StickyBarProvider } from "@/context/StickyBarContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <StickyBarProvider>{children}</StickyBarProvider>
    </CartProvider>
  );
}
