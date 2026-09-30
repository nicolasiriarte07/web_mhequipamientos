"use client";

import { useEffect } from "react";
import type { Product } from "@/lib/types";
import { RECENTLY_VIEWED_KEY, RECENTLY_VIEWED_MAX } from "@/lib/recentlyViewed";

export function RecordRecentlyViewed({ product }: { product: Product }) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
      const existing: Product[] = raw ? JSON.parse(raw) : [];
      const withoutCurrent = existing.filter((p) => p.id !== product.id);
      const updated = [product, ...withoutCurrent].slice(0, RECENTLY_VIEWED_MAX);
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
    } catch {
      // localStorage no disponible, no persistimos el historial
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  return null;
}
