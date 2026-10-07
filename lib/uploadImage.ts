"use client";

import { supabase } from "@/lib/supabase";

export const IMAGE_BUCKET = "images";
const MAX_SIDE = 1600; // pixels
const QUALITY = 0.85;

/**
 * Réduit une photo de téléphone (souvent 4 à 8 Mo) à 1600 px maximum,
 * en JPEG : plus rapide à charger pour les clients sur réseau mobile.
 */
async function compress(file: File): Promise<Blob> {
  if (!file.type.startsWith("image/") || file.type === "image/gif" || file.type === "image/svg+xml") {
    return file;
  }
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) return file;

  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.fillStyle = "#ffffff"; // fond blanc pour les PNG transparents
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", QUALITY));
  return blob && blob.size < file.size ? blob : file;
}

/**
 * Envoie une image dans Supabase Storage (dossier = produits, categories…)
 * et renvoie son adresse publique.
 */
export async function uploadImage(file: File, folder: string): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Ce fichier n'est pas une image.");
  if (file.size > 20 * 1024 * 1024) throw new Error("Image trop lourde (20 Mo maximum).");

  const body = await compress(file);
  const ext = body.type === "image/jpeg" ? "jpg" : (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, body, {
    contentType: body.type || file.type,
    cacheControl: "31536000",
    upsert: false,
  });

  if (error) {
    if (/bucket not found/i.test(error.message)) {
      throw new Error("Le stockage des photos n'est pas activé : exécutez supabase/photos.sql dans Supabase.");
    }
    if (/row-level security|unauthorized|403/i.test(error.message)) {
      throw new Error("Envoi refusé : reconnectez-vous en tant qu'administrateur.");
    }
    throw new Error(error.message);
  }

  return supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}
