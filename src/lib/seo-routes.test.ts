import { describe, expect, it } from "vitest";
import { dockTemplates } from "./dock-catalog";
import { getSeoRoutes, normalizeSiteUrl } from "./seo-routes";

describe("seo routes", () => {
  it("normalizes the public site url", () => {
    expect(normalizeSiteUrl("https://example.com/")).toBe("https://example.com");
    expect(normalizeSiteUrl(undefined)).toBe("https://skilldock.pages.dev");
  });

  it("generates localized homepage, dock list, and dock detail routes", () => {
    const routes = getSeoRoutes("https://skilldock.test/");
    const urls = routes.map((route) => route.url);

    expect(urls).toContain("https://skilldock.test/en");
    expect(urls).toContain("https://skilldock.test/ja/docks");
    expect(urls).toContain(
      `https://skilldock.test/zh-CN/docks/${dockTemplates[0].id}`,
    );
    expect(routes).toHaveLength(4 + 4 + 4 * dockTemplates.length);
  });
});
