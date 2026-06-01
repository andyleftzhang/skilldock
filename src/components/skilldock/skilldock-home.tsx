import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { BuilderShell } from "./builder-shell";
import { DeckBackground } from "./deck-background";
import { Navbar } from "./navbar";

export type SkillDockHomeMessages = {
  navExplore: string;
  navBuilder: string;
  navLanguage: string;
  headline: string;
  highlightA: string;
  highlightB: string;
  subtitle: string;
  previewTitle: string;
  previewFormat: string;
  copy: string;
  copied: string;
  download: string;
  exportAs: string;
  universalPrompt: string;
  universalPromptDescription: string;
  cursorRules: string;
  cursorRulesDescription: string;
  codexSkillPack: string;
  codexSkillPackDescription: string;
  docks: string;
  viewDetails: string;
  personas: string;
  enhancements: string;
  outputLanguage: string;
  shelfA: string;
  shelfB: string;
  shelfC: string;
};

type SkillDockHomeProps = {
  locale: string;
  messages: SkillDockHomeMessages;
};

export function SkillDockHome({ locale, messages }: SkillDockHomeProps) {
  return (
    <main className="relative min-h-svh overflow-hidden bg-background text-foreground">
      <DeckBackground />
      <Navbar
        activeItem="builder"
        builderHref="#builder"
        builderLabel={messages.navBuilder}
        currentLocale={locale}
        exploreHref={`/${locale}/docks`}
        exploreLabel={messages.navExplore}
        languageLabel={messages.navLanguage}
      />
      <section
        className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-5 pb-14 pt-8 sm:px-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-end lg:pb-20 lg:pt-10"
        id="builder"
      >
        <Suspense>
          <BuilderShell
            locale={locale}
            panel={{
              docksLabel: messages.docks,
              viewDetailsLabel: messages.viewDetails,
              enhancementsLabel: messages.enhancements,
              outputLanguageLabel: messages.outputLanguage,
              personasLabel: messages.personas,
              shelfA: messages.shelfA,
              shelfB: messages.shelfB,
              shelfC: messages.shelfC,
            }}
            preview={{
              copiedLabel: messages.copied,
              copyLabel: messages.copy,
              downloadLabel: messages.download,
              exportAsLabel: messages.exportAs,
              exportTargets: [
                {
                  id: "universal-prompt",
                  label: messages.universalPrompt,
                  description: messages.universalPromptDescription,
                },
                {
                  id: "cursor-rules",
                  label: messages.cursorRules,
                  description: messages.cursorRulesDescription,
                },
                {
                  id: "codex-skill-pack",
                  label: messages.codexSkillPack,
                  description: messages.codexSkillPackDescription,
                },
              ],
              format: messages.previewFormat,
              title: messages.previewTitle,
            }}
          >
            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge className="border-cyan-300/20 bg-cyan-300/10 text-cyan-100" variant="outline">
                  {messages.highlightA}
                </Badge>
                <Badge className="border-fuchsia-300/20 bg-fuchsia-300/10 text-fuchsia-100" variant="outline">
                  {messages.highlightB}
                </Badge>
              </div>
              <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.08em] text-white sm:text-6xl lg:text-7xl">
                {messages.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
                {messages.subtitle}
              </p>
            </div>
          </BuilderShell>
        </Suspense>
      </section>
    </main>
  );
}
