"use client";

import { useState } from "react";

export type EnglishField = {
  /** Nom de la colonne anglaise, ex. "name_en" */
  key: string;
  label: string;
  /** Valeur française correspondante (sert de source à la traduction auto) */
  source: string;
  multiline?: boolean;
};

/**
 * Bloc « Version anglaise » pour les formulaires admin.
 * Les champs sont facultatifs : vides, le site affiche le français.
 */
export default function EnglishFields({
  fields,
  values,
  onChange,
}: {
  fields: EnglishField[];
  values: Record<string, string>;
  onChange: (next: Record<string, string>) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const filled = fields.filter((f) => values[f.key]?.trim()).length;

  async function autoTranslate() {
    const todo = fields.filter((f) => f.source.trim());
    if (todo.length === 0) {
      setError("Remplissez d'abord les champs en français.");
      return;
    }

    setBusy(true);
    setError("");

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: todo.map((f) => f.source) }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "La traduction a échoué.");
        return;
      }

      const next = { ...values };
      todo.forEach((f, i) => {
        next[f.key] = data.translations[i] ?? "";
      });
      onChange(next);
    } catch {
      setError("La traduction a échoué. Vérifiez votre connexion.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <details className="rounded-2xl border border-dashed p-4" open={filled > 0}>
      <summary className="cursor-pointer select-none text-sm font-black">
        🇬🇧 Version anglaise{" "}
        <span className="font-semibold text-neutral-400">
          ({filled}/{fields.length} — facultatif)
        </span>
      </summary>

      <div className="mt-4 space-y-3">
        {fields.map((f) =>
          f.multiline ? (
            <textarea
              key={f.key}
              value={values[f.key] || ""}
              onChange={(e) => onChange({ ...values, [f.key]: e.target.value })}
              placeholder={`${f.label} (EN)`}
              className="min-h-24 w-full rounded-2xl border px-4 py-3 text-sm"
            />
          ) : (
            <input
              key={f.key}
              value={values[f.key] || ""}
              onChange={(e) => onChange({ ...values, [f.key]: e.target.value })}
              placeholder={`${f.label} (EN)`}
              className="w-full rounded-2xl border px-4 py-3 text-sm"
            />
          )
        )}

        <button
          type="button"
          onClick={autoTranslate}
          disabled={busy}
          className="w-full rounded-full border-2 border-neutral-950 py-2.5 text-sm font-bold hover:bg-neutral-950 hover:text-white disabled:opacity-50"
        >
          {busy ? "Traduction…" : "Traduire automatiquement depuis le français"}
        </button>

        <p className="text-xs text-neutral-500">
          Relisez toujours le résultat : les termes de mercerie sont parfois mal traduits.
        </p>

        {error && (
          <p className="rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-600">{error}</p>
        )}
      </div>
    </details>
  );
}

/** Transforme les valeurs du formulaire en colonnes Supabase (vide → null). */
export function englishValues(fields: EnglishField[], values: Record<string, string>) {
  return Object.fromEntries(
    fields.map((f) => [f.key, values[f.key]?.trim() || null])
  );
}

/** Reprend les valeurs anglaises d'une ligne Supabase existante. */
export function englishFromRow(fields: EnglishField[], row: Record<string, unknown>) {
  return Object.fromEntries(
    fields.map((f) => [f.key, typeof row[f.key] === "string" ? (row[f.key] as string) : ""])
  );
}
