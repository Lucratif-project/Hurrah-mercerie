import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";
import { LocaleProvider } from "@/lib/i18n/client";
import { getI18n, getLocale } from "@/lib/i18n/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hurrahmercerie.com";
const OG_IMAGE = `${SITE_URL}/images/machines/machine singer.jpeg`;

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.meta.title,
      template: "%s | Hurrah Mercerie",
    },
    description: t.meta.description,
    openGraph: {
      title: "Hurrah Mercerie",
      description: t.meta.ogDescription,
      url: SITE_URL,
      siteName: "Hurrah Mercerie",
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
      locale: t.meta.ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Hurrah Mercerie",
      description: t.meta.ogDescription,
      images: [OG_IMAGE],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <LocaleProvider locale={locale}>
          <ToastProvider>{children}</ToastProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
