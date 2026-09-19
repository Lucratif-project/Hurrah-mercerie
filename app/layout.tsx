import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hurrahmercerie.com";
const OG_IMAGE = `${SITE_URL}/images/machines/machine singer.jpeg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hurrah Mercerie | Machines à coudre, tissus et accessoires",
    template: "%s | Hurrah Mercerie",
  },
  description:
    "Découvrez Hurrah Mercerie : machines à coudre, tissus, fils et accessoires pour tous vos projets de couture.",
  openGraph: {
    title: "Hurrah Mercerie",
    description:
      "Machines à coudre, tissus, fils et accessoires pour donner vie à vos créations.",
    url: SITE_URL,
    siteName: "Hurrah Mercerie",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hurrah Mercerie",
    description:
      "Machines à coudre, tissus, fils et accessoires pour donner vie à vos créations.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
