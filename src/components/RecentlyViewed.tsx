"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductGrid } from "@/components/ProductGrid";
import { RECENTLY_VIEWED_KEY } from "@/lib/recentlyViewed";

export function RecentlyViewed() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setProducts(JSON.parse(raw));
    } catch {
      // localStorage no disponible, no mostramos nada
    }
  }, []);

  if (products.length === 0) return null;

  return <ProductGrid title="Vistos recientemente" products={products} />;
}
