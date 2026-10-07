import LegalPageView, { legalMetadata } from "@/components/LegalPageView";

export function generateMetadata() {
  return legalMetadata("confidentialite");
}

export default function Page() {
  return <LegalPageView slug="confidentialite" />;
}
