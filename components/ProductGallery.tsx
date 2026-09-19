"use client";

import { useState } from "react";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative h-[420px] overflow-hidden rounded-[2rem] bg-white sm:h-[520px]">
        <img
          src={images[active]}
          alt={name}
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
