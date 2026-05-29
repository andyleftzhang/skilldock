# SkillDock Task 2 Neon Command Deck Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Install Shadcn UI and replace the localized placeholder with a static, responsive Neon Command Deck first screen.

**Architecture:** Keep the App Router locale page server-rendered. Add focused `src/components/skilldock/*` components for the shell, navbar, prompt preview, and docking panel, with static sample data in `src/lib/skilldock-data.ts` and localized visible copy in the four `messages/*.json` catalogs. Use Shadcn source components for buttons, cards, badges, dropdown menu, separator, checkbox, and radio group, with only the language switcher running as a small client component.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Shadcn UI, next-intl, Vitest, npm

---

### Task 1: Initialize Shadcn UI

**Files:**
- Create: `components.json`
- Create: `src/lib/utils.ts`
- Modify: `src/app/globals.css`
- Modify: `package.json`
- Modify: `package-lock.json`
- Add generated Shadcn files under `src/components/ui/`

- [ ] **Step 1: Inspect current Shadcn state**

Run:

```bash
npx shadcn@latest info --json
```

Expected: reports no Shadcn project or missing `components.json`.

- [ ] **Step 2: Initialize Shadcn for this Next.js project**

Run:

```bash
npx shadcn@latest init --defaults --base radix
```

Expected: creates `components.json`, `src/lib/utils.ts`, updates dependencies, and preserves Tailwind v4 global CSS.

- [ ] **Step 3: Add only required components**

Run:

```bash
npx shadcn@latest docs button card badge dropdown-menu separator checkbox radio-group
npx shadcn@latest add button card badge dropdown-menu separator checkbox radio-group
```

Expected: adds only those UI source components under `src/components/ui/`.

- [ ] **Step 4: Commit Shadcn foundation**

Run:

```bash
npm test
npm run lint
git add components.json package.json package-lock.json src/app/globals.css src/components/ui src/lib/utils.ts
git commit -m "chore: initialize Shadcn UI"
```

Expected: existing tests and lint pass.

### Task 2: Add Static Data And Translation Contract

**Files:**
- Create: `src/lib/skilldock-data.ts`
- Modify: `messages/en.json`
- Modify: `messages/ja.json`
- Modify: `messages/es.json`
- Modify: `messages/zh-CN.json`
- Create: `src/lib/skilldock-data.test.ts`

- [ ] **Step 1: Write the failing data contract test**

Create `src/lib/skilldock-data.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  enhancements,
  outputLanguages,
  personas,
  promptPreviewLines,
} from "./skilldock-data";

describe("SkillDock static builder data", () => {
  it("provides the exact first-screen shelves and preview content", () => {
    expect(personas.map((item) => item.id)).toEqual([
      "senior-frontend",
      "python-agent",
      "prompt-engineer",
      "code-reviewer",
    ]);
    expect(enhancements.map((item) => item.id)).toEqual([
      "clean-code",
      "debug-mode",
      "security-review",
    ]);
    expect(outputLanguages.map((item) => item.locale)).toEqual([
      "en",
      "ja",
      "es",
      "zh-CN",
    ]);
    expect(promptPreviewLines.length).toBeGreaterThan(10);
  });
});
```

- [ ] **Step 2: Run the test to verify red state**

Run:

```bash
npm test -- src/lib/skilldock-data.test.ts
```

Expected: FAIL because `src/lib/skilldock-data.ts` does not exist.

- [ ] **Step 3: Implement static data**

Create `src/lib/skilldock-data.ts` exporting:

- `personas`: four items with ids `senior-frontend`, `python-agent`, `prompt-engineer`, `code-reviewer`.
- `enhancements`: three items with ids `clean-code`, `debug-mode`, `security-review`.
- `outputLanguages`: four items mapping labels to `en`, `ja`, `es`, `zh-CN`.
- `promptPreviewLines`: a YAML-like array of at least 11 visible lines for the code preview.

- [ ] **Step 4: Extend all message catalogs**

Keep the existing `Home.title` and `Home.status` keys, and add a `Landing` namespace with localized strings for:

```json
{
  "nav": {
    "explore": "...",
    "builder": "...",
    "language": "..."
  },
  "hero": {
    "headline": "...",
    "highlightA": "...",
    "highlightB": "...",
    "subtitle": "..."
  },
  "preview": {
    "title": "...",
    "format": "...",
    "copy": "...",
    "download": "..."
  },
  "panel": {
    "personas": "...",
    "enhancements": "...",
    "outputLanguage": "...",
    "shelfA": "...",
    "shelfB": "...",
    "shelfC": "..."
  }
}
```

- [ ] **Step 5: Run the data test to green**

Run:

```bash
npm test -- src/lib/skilldock-data.test.ts
```

Expected: PASS.

- [ ] **Step 6: Commit data and messages**

Run:

```bash
git add src/lib/skilldock-data.ts src/lib/skilldock-data.test.ts messages
git commit -m "feat: add SkillDock builder content data"
```

### Task 3: Build The Neon Command Deck Components

**Files:**
- Create: `src/components/skilldock/skilldock-home.tsx`
- Create: `src/components/skilldock/navbar.tsx`
- Create: `src/components/skilldock/language-switcher.tsx`
- Create: `src/components/skilldock/prompt-preview.tsx`
- Create: `src/components/skilldock/docking-panel.tsx`
- Create: `src/components/skilldock/deck-background.tsx`
- Modify: `src/app/[locale]/page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace the placeholder page composition**

Modify `src/app/[locale]/page.tsx` so it loads `Landing` translations and renders:

```tsx
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SkillDockHome } from "@/components/skilldock/skilldock-home";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Landing");

  return <SkillDockHome locale={locale} messages={{
    navExplore: t("nav.explore"),
    navBuilder: t("nav.builder"),
    navLanguage: t("nav.language"),
    headline: t("hero.headline"),
    highlightA: t("hero.highlightA"),
    highlightB: t("hero.highlightB"),
    subtitle: t("hero.subtitle"),
    previewTitle: t("preview.title"),
    previewFormat: t("preview.format"),
    copy: t("preview.copy"),
    download: t("preview.download"),
    personas: t("panel.personas"),
    enhancements: t("panel.enhancements"),
    outputLanguage: t("panel.outputLanguage"),
    shelfA: t("panel.shelfA"),
    shelfB: t("panel.shelfB"),
    shelfC: t("panel.shelfC")
  }} />;
}
```

Implement with a named `SkillDockHomeMessages` type in `skilldock-home.tsx`; keep the page as a server component.

- [ ] **Step 2: Implement focused components**

Implement:

- `SkillDockHome`: layout glue, background wrapper, responsive two-column hero.
- `Navbar`: brand mark, tabs, language switcher slot.
- `LanguageSwitcher`: `"use client"`, Shadcn dropdown menu, navigates between `/${locale}` routes.
- `PromptPreview`: Shadcn card plus code-preview lines and static buttons.
- `DockingPanel`: Shadcn card sections using persona cards, badges, checkboxes, radio group.
- `DeckBackground`: decorative non-interactive gradient/grid layers.

Use `lucide-react` icons if installed by Shadcn; otherwise install it through Shadcn-generated dependencies or replace with CSS/SVG-free textless treatment.

- [ ] **Step 3: Replace placeholder CSS with theme tokens and page utilities**

Remove `.placeholder-*` styles. Keep base body styles and add Tailwind v4-compatible theme variables if Shadcn init did not already provide them. Prefer Tailwind utility classes in components for layout; use globals for theme variables and page-wide body defaults only.

- [ ] **Step 4: Commit static UI**

Run:

```bash
npm test
npm run lint
git add src/app/[locale]/page.tsx src/app/globals.css src/components/skilldock
git commit -m "feat: build Neon Command Deck homepage"
```

Expected: tests and lint pass.

### Task 4: Verify Build And First-Screen Routes

**Files:**
- Modify only if verification exposes defects.

- [ ] **Step 1: Run full verification**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected: all commands pass. If Turbopack fails in the sandbox with internal port binding, rerun `npm run build` with escalated permissions.

- [ ] **Step 2: Run local production route checks**

Run:

```bash
npm run start
curl -I http://localhost:3000/
curl -s http://localhost:3000/en
curl -s http://localhost:3000/ja
curl -IL http://localhost:3000/fr
```

Expected: `/` redirects to `/en`, `/en` and `/ja` render the Neon Command Deck UI with correct localized text and `lang`, `/fr` ultimately returns 404.

- [ ] **Step 3: Browser visual QA**

Open `/en` and `/ja` in the browser. Check desktop and a narrow mobile viewport for:

- Navbar remains usable.
- Code preview and docking panel stack without horizontal overflow.
- Buttons are visibly static but styled.
- Language dropdown can navigate among supported locale routes.
- Visual direction matches the approved Neon Command Deck concept.

- [ ] **Step 4: Final commit if verification fixes were needed**

If any verification fixes were made, commit them:

```bash
git add .
git commit -m "fix: polish Neon Command Deck verification issues"
```
