"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductGrid } from "@/components/ProductGrid";
import { RECENTLY_VIEWED_KEY } from "@/lib/recentlyViewed";
import { getComplementaryProducts } from "@/lib/data";

const TARGET_COUNT = 5;

export function RecentlyViewed() {
  const [viewed, setViewed] = useState<Product[]>([]);
  const [complementary, setComplementary] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setViewed(JSON.parse(raw));
    } catch {
      // localStorage no disponible, no mostramos nada
    }
  }, []);

  useEffect(() => {
    if (viewed.length === 0 || viewed.length >= TARGET_COUNT) return;

    let cancelled = false;
    const categoryIds = [
      ...new Set(
        viewed.map((p) => p.categoria_id).filter((id): id is number => id != null)
      ),
    ];
    const excludeIds = viewed.map((p) => p.id);

    getComplementaryProducts(categoryIds, excludeIds, TARGET_COUNT - viewed.length).then(
      (products) => {
        if (!cancelled) setComplementary(products);
      }
    );

    return () => {
      cancelled = true;
    };
  }, [viewed]);

  if (viewed.length === 0) return null;

  return <ProductGrid title="Vistos recientemente" products={[...viewed, ...complementary]} />;
}
