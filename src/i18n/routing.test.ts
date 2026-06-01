import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { routing } from "./routing";

describe("localized routing", () => {
  it("exposes English as the only maintained site locale", () => {
    expect(routing.locales).toEqual(["en"]);
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
