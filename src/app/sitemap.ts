import type { MetadataRoute } from "next";
import { getSeoRoutes } from "@/lib/seo-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return getSeoRoutes(process.env.NEXT_PUBLIC_SITE_URL);
}
