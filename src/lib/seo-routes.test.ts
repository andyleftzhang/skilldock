import { describe, expect, it } from "vitest";
import { dockTemplates } from "./dock-catalog";
import { getSeoRoutes, normalizeSiteUrl } from "./seo-routes";

describe("seo routes", () => {
  it("normalizes the public site url", () => {
    expect(normalizeSiteUrl("https://example.com/")).toBe("https://example.com");
    expect(normalizeSiteUrl(undefined)).toBe("https://skilldock.pages.dev");
  });

  it("generates English homepage, dock list, and dock detail routes", () => {
    const routes = getSeoRoutes("https://skilldock.test/");
    const urls = routes.map((route) => route.url);

    expect(urls).toContain("https://skilldock.test/en");
    expect(urls).toContain("https://skilldock.test/en/docks");
    expect(urls).toContain(
      `https://skilldock.test/en/docks/${dockTemplates[0].id}`,
    );
    expect(routes).toHaveLength(2 + dockTemplates.length);
  });
});
