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

  it("defines a statically analyzable proxy matcher for localized page requests", () => {
    const proxySource = readFileSync(
      join(process.cwd(), "src/proxy.ts"),
      "utf8",
    );

    expect(proxySource).toContain(
      'matcher: "/((?!api|trpc|_next|_vercel|.*\\\\..*).*)"',
    );
  });
});
