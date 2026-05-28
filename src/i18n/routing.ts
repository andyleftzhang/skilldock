import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ja", "es", "zh-CN"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
});
