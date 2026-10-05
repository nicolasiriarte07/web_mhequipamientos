"use client";

import { CartProvider } from "@/context/CartContext";
import { StickyBarProvider } from "@/context/StickyBarContext";
import { ToastProvider } from "@/context/ToastContext";
import { Toast } from "@/components/Toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <StickyBarProvider>
        <ToastProvider>
          {children}
          <Toast />
        </ToastProvider>
      </StickyBarProvider>
    </CartProvider>
  );
}
