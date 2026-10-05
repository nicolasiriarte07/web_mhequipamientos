"use client";

import { useState } from "react";
import Image from "next/image";

export function ProductGallery({
  images,
  alt,
  badge,
}: {
  images: string[];
  alt: string;
  badge?: string;
}) {
  const [active, setActive] = useState(0);
  const mainImage = images[active];

  return (
    <div className="flex flex-col gap-3">
      <div className="group relative h-72 w-full overflow-hidden rounded-xl bg-gray-100 sm:h-96">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={alt}
            fill
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-110"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            Sin imagen
          </div>
        )}
        {badge && (
          <span className="absolute left-4 top-4 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
            {badge}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((url, i) => (
            <button
              key={url + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1} de ${images.length}`}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-gray-100 transition-colors ${
                i === active ? "border-brand" : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image src={url} alt="" fill className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
