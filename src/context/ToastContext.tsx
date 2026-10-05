"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

type ToastState = {
  id: number;
  message: string;
  actionLabel?: string;
  actionHref?: string;
} | null;

type ToastContextValue = {
  toast: ToastState;
  showToast: (message: string, action?: { label: string; href: string }) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(
    (message: string, action?: { label: string; href: string }) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setToast({ id: Date.now(), message, actionLabel: action?.label, actionHref: action?.href });
      timeoutRef.current = setTimeout(() => setToast(null), 3000);
    },
    []
  );

  return <ToastContext.Provider value={{ toast, showToast }}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast debe usarse dentro de ToastProvider");
  return ctx;
}
