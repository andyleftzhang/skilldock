import { describe, expect, it } from "vitest";
import { routing } from "./routing";

describe("localized routing", () => {
  it("exposes all launch locales with English as the deterministic default", () => {
    expect(routing.locales).toEqual(["en", "ja", "es", "zh-CN"]);
    expect(routing.defaultLocale).toBe("en");
    expect(routing.localePrefix).toBe("always");
    expect(routing.localeDetection).toBe(false);
  });
});
