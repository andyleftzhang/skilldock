# SkillDock Task 1 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize SkillDock as a Next.js 16 App Router application with Tailwind CSS and deterministic four-locale `next-intl` routing.

**Architecture:** Generate the standard TypeScript/Tailwind/App Router scaffold, then place all application pages under `[locale]`. A central `routing.ts` definition drives `next-intl` proxy behavior, request message loading, static locale generation, and future locale-aware navigation.

**Tech Stack:** Next.js 16.2.x, React, TypeScript, Tailwind CSS, ESLint, `next-intl`, Vitest, npm

---

### Task 1: Generate The Next.js Baseline

**Files:**
- Create: scaffolded project files including `package.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `src/app/globals.css`, and `public/*`
- Preserve: `docs/superpowers/specs/2026-05-27-skilldock-task-1-foundation-design.md`
- Preserve: `docs/superpowers/plans/2026-05-27-skilldock-task-1-foundation.md`

- [ ] **Step 1: Create the official scaffold in a temporary empty location**

Run:

```bash
npx create-next-app@latest /private/tmp/skilldock-next-scaffold --ts --tailwind --eslint --app --src-dir --turbopack --import-alias "@/*" --use-npm --disable-git --skip-install --yes
```

Expected: a Next.js App Router scaffold is generated without replacing the existing Git history or docs.

- [ ] **Step 2: Move the generated scaffold files into the repository**

Copy the generated project baseline into `/Users/jxrt/Documents/skilldock`, preserving the existing `docs/` directory and `.git/` directory. Do not keep the default demonstration page as final application behavior because locale pages replace it in Task 3.

- [ ] **Step 3: Install baseline dependencies**

Run:

```bash
npm install
```

Expected: `node_modules/` and `package-lock.json` are produced with no installation errors.

- [ ] **Step 4: Commit the generated baseline**

```bash
git add .gitignore README.md eslint.config.mjs next.config.ts package.json package-lock.json postcss.config.mjs public src tsconfig.json
git commit -m "chore: initialize Next.js application"
```

### Task 2: Add Test Harness And Locale Contract

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/i18n/routing.test.ts`

- [ ] **Step 1: Install the minimal test harness and i18n package**

Run:

```bash
npm install next-intl
npm install --save-dev vitest
```

Expected: `next-intl` is recorded in dependencies and `vitest` in devDependencies.

- [ ] **Step 2: Add a unit-test script and Vitest configuration**

Add `"test": "vitest run"` to `package.json` scripts and create:

```ts
// vitest.config.ts
import {defineConfig} from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname
    }
  },
  test: {
    environment: "node"
  }
});
```

- [ ] **Step 3: Write the failing routing contract test**

Create:

```ts
// src/i18n/routing.test.ts
import {describe, expect, it} from "vitest";
import {routing} from "./routing";

describe("localized routing", () => {
  it("exposes all launch locales with English as the deterministic default", () => {
    expect(routing.locales).toEqual(["en", "ja", "es", "zh-CN"]);
    expect(routing.defaultLocale).toBe("en");
    expect(routing.localePrefix).toBe("always");
    expect(routing.localeDetection).toBe(false);
  });
});
```

- [ ] **Step 4: Run the test to verify red state**

Run:

```bash
npm test -- src/i18n/routing.test.ts
```

Expected: FAIL because `src/i18n/routing.ts` does not yet exist.

### Task 3: Implement Locale Routing And Message Loading

**Files:**
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/navigation.ts`
- Create: `src/i18n/request.ts`
- Create: `src/proxy.ts`
- Modify: `next.config.ts`
- Create: `messages/en.json`
- Create: `messages/ja.json`
- Create: `messages/es.json`
- Create: `messages/zh-CN.json`

- [ ] **Step 1: Implement the routing contract**

Create:

```ts
// src/i18n/routing.ts
import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ja", "es", "zh-CN"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false
});
```

- [ ] **Step 2: Run the routing test to verify green state**

Run:

```bash
npm test -- src/i18n/routing.test.ts
```

Expected: PASS for the supported locale/default locale contract.

- [ ] **Step 3: Add the official `next-intl` App Router wiring**

Create:

```ts
// src/i18n/navigation.ts
import {createNavigation} from "next-intl/navigation";
import {routing} from "./routing";

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
```

```ts
// src/i18n/request.ts
import {hasLocale} from "next-intl";
import {getRequestConfig} from "next-intl/server";
import {routing} from "./routing";

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
```

```ts
// src/proxy.ts
import createMiddleware from "next-intl/middleware";
import {routing} from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
};
```

Wrap `next.config.ts` with the official plugin:

```ts
import type {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
```

- [ ] **Step 4: Add minimal initial messages**

Create four catalogs with the same keys and localized values:

```json
// messages/en.json
{"Home":{"title":"SkillDock","status":"Localized foundation ready."}}
```

```json
// messages/ja.json
{"Home":{"title":"SkillDock","status":"多言語対応の基盤が準備できました。"}}
```

```json
// messages/es.json
{"Home":{"title":"SkillDock","status":"La base multilingüe esta lista."}}
```

```json
// messages/zh-CN.json
{"Home":{"title":"SkillDock","status":"多语言基础架构已就绪。"}}
```

### Task 4: Replace Demo Page With The Localized Shell

**Files:**
- Delete: `src/app/page.tsx`
- Delete: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Remove the non-localized demo entry points**

Delete the scaffolded `src/app/page.tsx` and `src/app/layout.tsx`. The
localized layout becomes the App Router root layout so each document can emit
its actual `lang` attribute.

- [ ] **Step 2: Implement the locale layout with static parameters**

Create:

```tsx
// src/app/[locale]/layout.tsx
import type {Metadata} from "next";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export const metadata: Metadata = {
  title: "SkillDock",
  description: "Build reusable AI skill configurations."
};

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
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
```

- [ ] **Step 3: Implement the translated placeholder page**

Create:

```tsx
// src/app/[locale]/page.tsx
import {setRequestLocale, getTranslations} from "next-intl/server";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <main>
      <h1>{t("title")}</h1>
      <p>{t("status")}</p>
    </main>
  );
}
```

- [ ] **Step 4: Add only dark foundation styling**

Reduce scaffold demo styling to global dark tokens, body defaults, and a centered placeholder layout. Do not create Navbar, builder panels, Shadcn components, or product interactions.

- [ ] **Step 5: Commit locale implementation**

```bash
git add next.config.ts package.json package-lock.json vitest.config.ts messages src
git commit -m "feat: add localized application foundation"
```

### Task 5: Verify Routes And Delivery Boundary

**Files:**
- Modify only when required to fix verification defects from Tasks 1-4.

- [ ] **Step 1: Run automated checks**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected: all commands exit successfully; the production build generates localized routes.

- [ ] **Step 2: Verify HTTP behavior locally**

Run the production server and request the essential paths:

```bash
npm run start
curl -I http://localhost:3000/
curl http://localhost:3000/en
curl http://localhost:3000/ja
curl -IL http://localhost:3000/fr
```

Expected: `/` redirects to `/en`; `/en` contains `Localized foundation ready.`; `/ja` contains its Japanese status message and declares `lang="ja"`; following any normalization redirect for `/fr` ends in not found.

- [ ] **Step 3: Report the initialized structure**

Describe the responsibilities of `src/app/[locale]`, `src/i18n`, `messages`, `src/proxy.ts`, and the future shared component directory. State clearly that Shadcn UI installation and Hero static UI are the next implementation phase.
