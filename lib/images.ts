// Domaines dont les images passent par l'optimiseur d'images de Next.js.
// Les autres s'affichent quand même, mais telles quelles : l'optimiseur ne
// peut ainsi pas servir de relais pour télécharger n'importe quel site.
const SUPABASE_HOST = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || "").hostname;
  } catch {
    return "";
  }
})();

// Les photos Higgsfield (cloudfront) ne passent PAS par l'optimiseur :
// certains réseaux (dont des connexions au Bénin) n'arrivent pas à les joindre
// depuis le serveur. Le navigateur du client les charge alors directement.
export const TRUSTED_IMAGE_HOSTS = [SUPABASE_HOST].filter(Boolean);

export function isTrustedImage(src: string) {
  if (src.startsWith("/")) return true;
  try {
    const host = new URL(src).hostname;
    return TRUSTED_IMAGE_HOSTS.includes(host) || host.endsWith(".supabase.co");
  } catch {
    return false;
  }
}
