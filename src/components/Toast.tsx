"use client";

import Link from "next/link";
import { useToast } from "@/context/ToastContext";

export function Toast() {
  const { toast } = useToast();

  if (!toast) return null;

  return (
    <div
      key={toast.id}
      className="fixed bottom-24 left-1/2 z-[90] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-3 rounded-xl bg-gray-900 px-4 py-3 text-sm text-white shadow-xl animate-[toast-in_0.2s_ease-out]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 shrink-0 text-green-400"
        aria-hidden
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
      <span className="truncate">{toast.message}</span>
      {toast.actionHref && (
        <Link
          href={toast.actionHref}
          className="shrink-0 font-semibold text-white underline underline-offset-2 hover:no-underline"
        >
          {toast.actionLabel}
        </Link>
      )}
    </div>
  );
}
