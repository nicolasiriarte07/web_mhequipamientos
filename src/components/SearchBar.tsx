"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar({
  initialValue = "",
  compact = false,
}: {
  initialValue?: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (value.trim()) params.set("q", value.trim());
    router.push(`/productos${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-3 rounded-2xl border border-black/5 bg-white shadow-sm ${
        compact ? "px-4 py-2.5" : "px-5 py-4"
      }`}
    >
      <span aria-hidden className="text-gray-400">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar productos por nombre, marca o descripción..."
        className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
      />
    </form>
  );
}
