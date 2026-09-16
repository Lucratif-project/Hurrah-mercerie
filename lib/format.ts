export function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-FR").format(value) + " FCFA";
}
