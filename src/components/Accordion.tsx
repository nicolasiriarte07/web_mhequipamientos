"use client";

import { useState } from "react";

export type AccordionItemData = {
  question: string;
  answer: string;
};

function AccordionItem({ item, defaultOpen }: { item: AccordionItemData; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(Boolean(defaultOpen));

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm font-semibold text-gray-900 sm:text-base">{item.question}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-5 w-5 shrink-0 text-brand transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-200 ${
          open ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-gray-600">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export function Accordion({ items }: { items: AccordionItemData[] }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
      {items.map((item, i) => (
        <AccordionItem key={item.question} item={item} defaultOpen={i === 0} />
      ))}
    </div>
  );
}
