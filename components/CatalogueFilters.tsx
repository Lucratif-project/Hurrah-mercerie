"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  selectedCategory: string;
  searchTerm: string;
  availability: string;
};

export default function CatalogueFilters({
  selectedCategory,
  searchTerm,
  availability,
}: Props) {
  const router = useRouter();
  const [value, setValue] = useState(searchTerm);

  function applyFilters(nextQ: string, nextAvailability: string) {
    const params = new URLSearchParams();

    if (selectedCategory !== "Toutes") {
      params.set("categorie", selectedCategory);
    }

    if (nextQ.trim()) {
      params.set("q", nextQ.trim());
    }

    if (nextAvailability !== "toutes") {
      params.set("disponibilite", nextAvailability);
    }

    router.push(`/catalogue${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
      <form
        className="flex-1"
        onSubmit={(e) => {
          e.preventDefault();
          applyFilters(value, availability);
        }}
      >
        <div className="flex items-center gap-3 rounded-full border border-neutral-200 bg-white px-5 py-3 shadow-sm focus-within:border-orange-500">
          <svg
            className="h-5 w-5 flex-shrink-0 text-neutral-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>

          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Rechercher un produit, une couleur, une référence…"
            className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-neutral-400"
          />

          {value && (
            <button
              type="button"
              onClick={() => {
                setValue("");
                applyFilters("", availability);
              }}
              className="text-xs font-bold text-neutral-400 hover:text-neutral-700"
            >
              Effacer
            </button>
          )}

          <button
            type="submit"
            className="rounded-full bg-neutral-950 px-5 py-2 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            Rechercher
          </button>
        </div>
      </form>

      <div className="flex gap-2">
        {[
          { key: "toutes", label: "Toute disponibilité" },
          { key: "disponible", label: "Disponible" },
          { key: "rupture", label: "Rupture" },
        ].map((option) => (
          <button
            key={option.key}
            onClick={() => applyFilters(value, option.key)}
            className={`rounded-full px-4 py-3 text-xs font-bold transition ${
              availability === option.key
                ? "bg-orange-600 text-white"
                : "bg-white text-neutral-600 hover:bg-neutral-950 hover:text-white"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
