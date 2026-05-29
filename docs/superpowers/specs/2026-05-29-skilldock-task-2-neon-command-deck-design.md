# SkillDock Task 2 Neon Command Deck Design

## Goal

Install and configure Shadcn UI, then replace the localized placeholder with a
static, responsive first-screen homepage that presents SkillDock as a dark,
high-impact AI prompt/config builder.

## Approved Visual Direction

The accepted direction is **Neon Command Deck**, a blend of:

- **Command Deck:** an advanced AI engineering console with a code-editor-like
  output area as the primary visual anchor.
- **Neon Gallery:** blue, cyan, violet, and magenta lighting for a stronger
  global tech-tool first impression.

The page should feel like a real tool, not a pure marketing splash. The first
viewport must clearly show the workflow: choose skill modules on the right and
assemble a prompt/config preview on the left.

## Page Structure

- **Navbar:** SkillDock brand mark, `Explore Docks`, `Builder`, and a language
  dropdown showing the current locale. The dropdown can navigate between the
  four locale routes.
- **Hero copy:** a concise product headline and one supporting sentence above
  or beside the builder surface. Use localized copy from message catalogs.
- **Container Box:** a dark code-editor-style preview panel with sample
  generated prompt/config text, plus visible `Copy to Clipboard` and
  `Download Config` buttons. In Task 2 these buttons are static UI only.
- **Docking Panel:** three shelves:
  - Base Personas: card grid with sample personas such as Senior Frontend,
    Python Agent, Prompt Engineer, and Code Reviewer.
  - Enhancements: selectable-looking tags or checkbox rows such as Clean Code
    Rule, Debug Mode, and Security Review.
  - Output Language: radio-like options for English, 日本語, Español, and 简体中文.

## Implementation Shape

- Initialize Shadcn UI in the existing Next.js/Tailwind project using the npm
  package runner.
- Add only the Shadcn components needed for this static first screen, expected
  to include buttons, cards, badges, dropdown menu, separator, checkbox or
  toggle-like primitives, and radio group.
- Keep the localized App Router structure under `src/app/[locale]/`.
- Create focused components under `src/components/skilldock/` for the navbar,
  hero section, container preview, and docking panel.
- Use server components by default. Add a client component only where Shadcn
  interaction primitives require it, such as the language dropdown trigger.
- Store static sample data in a small local module instead of hardcoding long
  lists directly inside the page component.
- Extend the existing message catalogs with the visible homepage copy for all
  four launch languages.
- Keep copy/download behavior non-functional in Task 2. No clipboard API,
  file download generation, GitHub ingestion, persistence, analytics, or
  backend logic.

## Responsive Behavior

- Desktop and laptop: two-column builder surface with the preview panel on the
  left and docking panel on the right.
- Tablet/mobile: stack the preview and docking panel vertically while keeping
  the navbar and language switch usable.
- Avoid horizontal overflow and keep the first screen readable on narrow
  mobile widths.

## Verification

- Run the Shadcn CLI commands successfully and verify generated config/files.
- Run `npm test`, `npm run lint`, and `npm run build`.
- Start the app and visually verify `/en` and `/ja` in the browser.
- Confirm language navigation can move between supported locale routes.
- Confirm the page remains static: controls can show visual selected states if
  provided by primitives, but no copy/download side effects are required.

## Explicitly Deferred

- Real-time prompt assembly state.
- Clipboard and download functionality.
- Fetching or parsing GitHub repositories.
- Explore Docks listing pages.
- Auth, user accounts, storage, analytics, or APIs.
