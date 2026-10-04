"use client";

import { createContext, useContext, useState } from "react";

type StickyBarContextValue = {
  active: boolean;
  setActive: (active: boolean) => void;
};

const StickyBarContext = createContext<StickyBarContextValue | null>(null);

export function StickyBarProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);
  return (
    <StickyBarContext.Provider value={{ active, setActive }}>{children}</StickyBarContext.Provider>
  );
}

export function useStickyBar() {
  const ctx = useContext(StickyBarContext);
  if (!ctx) throw new Error("useStickyBar debe usarse dentro de StickyBarProvider");
  return ctx;
}
