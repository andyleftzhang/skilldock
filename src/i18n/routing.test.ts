import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { routing } from "./routing";

describe("localized routing", () => {
  it("exposes all launch locales with English as the deterministic default", () => {
    expect(routing.locales).toEqual(["en", "ja", "es", "zh-CN"]);
    expect(routing.defaultLocale).toBe("en");
    expect(routing.localePrefix).toBe("always");
    expect(routing.localeDetection).toBe(false);
  });

  it("uses an app-router root redirect instead of middleware for Cloudflare", () => {
    const rootPageSource = readFileSync(
      join(process.cwd(), "src/app/page.tsx"),
      "utf8",
    );

    expect(rootPageSource).toContain('redirect("/en")');
  });
});
