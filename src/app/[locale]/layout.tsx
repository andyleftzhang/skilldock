import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { normalizeSiteUrl } from "@/lib/seo-routes";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)),
  title: {
    default: "SkillDock | Curated AI Skills and Agent Workflow Guides",
    template: "%s | SkillDock",
  },
  description:
    "Discover curated AI skills, agent workflow repositories, install guidance, and first-run examples for Codex, Claude Code, Cursor, and compatible tools.",
  applicationName: "SkillDock",
  openGraph: {
    title: "SkillDock",
    description:
      "Curated AI skills, agent workflow guides, install commands, and first-run examples.",
    siteName: "SkillDock",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillDock",
    description:
      "Curated AI skills, agent workflow guides, install commands, and first-run examples.",
  },
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
