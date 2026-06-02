import type { MetadataRoute } from "next";
import { dockTemplates } from "./dock-catalog";
import { routing } from "@/i18n/routing";

const fallbackSiteUrl = "https://skilldock.pages.dev";
const lastModified = new Date("2026-06-01T00:00:00.000Z");

export function normalizeSiteUrl(siteUrl: string | undefined) {
  return (siteUrl || fallbackSiteUrl).replace(/\/+$/, "");
}

export function getSeoRoutes(
  siteUrl: string | undefined,
): MetadataRoute.Sitemap {
  const baseUrl = normalizeSiteUrl(siteUrl);
  const routes: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified,
      changeFrequency: "weekly",
      priority: locale === routing.defaultLocale ? 1 : 0.9,
    });

    routes.push({
      url: `${baseUrl}/${locale}/docks`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    });

    routes.push({
      url: `${baseUrl}/${locale}/builder`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    });

    for (const dock of dockTemplates) {
      routes.push({
        url: `${baseUrl}/${locale}/docks/${dock.id}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return routes;
}
