"use client";

import { useRef, useState } from "react";
import { uploadImage } from "@/lib/uploadImage";
import { useToast } from "./Toast";

/**
 * Bouton « Choisir une photo » pour l'admin : ouvre l'appareil photo ou la
 * galerie du téléphone, réduit l'image et l'envoie dans Supabase Storage.
 * onUploaded reçoit l'adresse publique de chaque photo envoyée.
 */
export default function ImageUploadButton({
  folder,
  onUploaded,
  multiple = false,
  label = "📷 Choisir une photo",
  className = "",
}: {
  folder: string;
  onUploaded: (url: string) => void | Promise<void>;
  multiple?: boolean;
  label?: string;
  className?: string;
}) {
  const toast = useToast();
  const input = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<string | null>(null);

  async function handle(files: FileList | null) {
    if (!files?.length) return;
    const list = Array.from(files);
    try {
      for (let i = 0; i < list.length; i++) {
        setProgress(list.length > 1 ? `Envoi ${i + 1}/${list.length}…` : "Envoi…");
        const url = await uploadImage(list[i], folder);
        await onUploaded(url);
      }
      toast.show(list.length > 1 ? `${list.length} photos ajoutées.` : "Photo ajoutée.");
    } catch (e) {
      toast.show(e instanceof Error ? e.message : "Échec de l'envoi.", "error");
    } finally {
      setProgress(null);
      if (input.current) input.current.value = "";
    }
  }

  return (
    <>
      <input
        ref={input}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => handle(e.target.files)}
      />
      <button
        type="button"
        disabled={progress !== null}
        onClick={() => input.current?.click()}
        className={`rounded-xl bg-orange-600 px-4 py-2 text-xs font-bold text-white hover:bg-orange-500 disabled:opacity-60 ${className}`}
      >
        {progress ?? label}
      </button>
    </>
  );
}
