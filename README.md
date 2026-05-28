# SkillDock

SkillDock is a Next.js App Router application with deterministic localized URLs.
It currently provides the application foundation and translated placeholder
route for English, Japanese, Spanish, and Simplified Chinese.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Requests to `/` redirect
to `/en`; localized routes are available at `/en`, `/ja`, `/es`, and `/zh-CN`.

## Structure

- `src/app/[locale]/` contains localized page and document layouts.
- `src/i18n/` defines locale routing, navigation helpers, and message loading.
- `messages/` contains the translation catalogs.
- `src/proxy.ts` applies deterministic locale-prefixed request routing.

Shared UI components and the product interface are intentionally deferred to
the next implementation phase.

## Commands

```bash
npm test
npm run lint
npm run build
```
