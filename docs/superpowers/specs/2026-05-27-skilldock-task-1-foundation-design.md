# SkillDock Task 1 Foundation Design

## Goal

Initialize SkillDock as a modern, deployable Next.js foundation with localized
URL routing, while intentionally deferring the Shadcn UI setup and Hero
interface implementation to the next task.

## Technology Baseline

- Framework: latest stable Next.js using the App Router and TypeScript.
- Styling: Tailwind CSS initialized by the Next.js scaffold.
- Quality tooling: ESLint with the scaffolded Next.js configuration.
- Project layout: `src/` source directory with App Router pages.
- Deployment posture: frontend-first project suitable for Vercel deployment.
- Theme posture: global dark-mode-ready color baseline only; no product UI
  styling or component library initialization in this task.

## Internationalization Architecture

- Use `next-intl` as the App Router-compatible i18n layer.
- Supported locales are `en`, `ja`, `es`, and `zh-CN`.
- `en` is the default locale.
- Public localized pages live beneath `src/app/[locale]/`.
- Request routing redirects `/` to `/en`.
- Requests for an unsupported locale resolve as not found.
- Locale pages load a minimal translated placeholder message so the routing and
  message-loading path can be validated before product UI work begins.
- The structure must remain compatible with localized metadata and static
  generation for later SEO work.

## Task 1 Deliverables

- A clean Next.js and Tailwind application skeleton in the empty repository.
- A small locale configuration layer, middleware or equivalent routing hook,
  and translation message files for all four initial languages.
- Valid behavior for `/`, `/en`, and `/ja`, with `/` selecting the default
  locale through redirect behavior.
- A concise final directory overview explaining where future pages, messages,
  and shared UI will live.

## Explicitly Deferred

- Shadcn UI installation and configuration.
- Navbar, live container editor, docking panel, copy/download interactions, or
  visual Hero design work.
- GitHub content ingestion, persistence, analytics, authentication, or backend
  APIs.

## Verification

- Install succeeds using the generated dependency configuration.
- Lint and production build pass.
- Route verification confirms that `/` redirects to `/en`, `/en` renders the
  English placeholder, `/ja` renders the Japanese placeholder, and an
  unsupported locale returns not found.

## Locked Defaults

- Use npm as the package manager because it is available in the current
  environment.
- Keep the initial app server-rendered by default and avoid client-side state
  until interactive UI work begins.
- Keep visible copy minimal in Task 1 so the next Hero design is not constrained
  by provisional product content.
