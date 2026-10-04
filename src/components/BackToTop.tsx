"use client";

import { useEffect, useState } from "react";
import { useStickyBar } from "@/context/StickyBarContext";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { active } = useStickyBar();

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver arriba"
      className={`fixed left-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand shadow-lg ring-1 ring-black/5 transition-[bottom,transform] hover:scale-105 ${active ? "bottom-20 sm:bottom-5" : "bottom-5"}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
