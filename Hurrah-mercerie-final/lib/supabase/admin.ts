import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase avec la clé secrète « service_role ».
 * Il contourne les règles de sécurité : à utiliser UNIQUEMENT côté serveur,
 * ici pour écrire le journal des connexions.
 * Variable d'environnement : SUPABASE_SERVICE_ROLE_KEY (jamais NEXT_PUBLIC_).
 * Renvoie null si la clé n'est pas configurée.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
