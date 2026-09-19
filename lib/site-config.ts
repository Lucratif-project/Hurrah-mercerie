// Numéro WhatsApp de Hurrah Mercerie, au format international sans "+" ni espaces
// (ex : 22990000000 pour le Bénin). À définir dans les variables d'environnement :
// NEXT_PUBLIC_WHATSAPP_NUMBER=22990000000
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export function buildWhatsAppLink(message: string) {
  const text = encodeURIComponent(message);
  if (WHATSAPP_NUMBER) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  }
  // Pas de numéro configuré : on ouvre WhatsApp Web sans destinataire pré-rempli.
  return `https://wa.me/?text=${text}`;
}

export const SITE_CONTACT = {
  phoneDisplay:
    process.env.NEXT_PUBLIC_PHONE_DISPLAY || "Numéro à configurer",
  address: process.env.NEXT_PUBLIC_ADDRESS || "Cotonou, Bénin",
};
