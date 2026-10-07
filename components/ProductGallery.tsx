"use client";

import { useEffect, useRef, useState } from "react";

export default function ProductGallery({
  images: initialImages,
  name,
  fallback,
}: {
  images: string[];
  name: string;
  /** Illustration affichée si une photo ne se charge pas. */
  fallback?: string;
}) {
  const [active, setActive] = useState(0);
  const [broken, setBroken] = useState<string[]>([]);
  const ok = initialImages.filter((src) => !broken.includes(src));
  const images = ok.length ? ok : fallback ? [fallback] : initialImages;
  const current = images[Math.min(active, images.length - 1)];
  const markBroken = (src: string) => {
    if (src !== fallback) setBroken((list) => (list.includes(src) ? list : [...list, src]));
  };

  // Une image peut échouer avant que la page soit interactive : on vérifie
  // une fois affichée.
  const mainRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = mainRef.current;
    if (el && el.complete && el.naturalWidth === 0) markBroken(current);
  });

  return (
    <div>
      <div className="relative h-[420px] overflow-hidden rounded-[2rem] bg-white sm:h-[520px]">
        <img
          ref={mainRef}
          src={current}
          alt={name}
          onError={() => markBroken(current)}
          className="h-full w-full object-contain p-10"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {images.map((img, index) => (
            <button
              key={img + index}
              type="button"
              onClick={() => setActive(index)}
              className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 bg-white transition ${
                active === index
                  ? "border-orange-600"
                  : "border-transparent hover:border-neutral-300"
              }`}
            >
              <img
                src={img}
                onError={() => markBroken(img)}
                alt={`${name} ${index + 1}`}
                className="h-full w-full object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
