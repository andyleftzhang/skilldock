import { Suspense } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dockTemplates } from "@/lib/dock-catalog";
import { BuilderShell } from "./builder-shell";
import { DeckBackground } from "./deck-background";
import { Navbar } from "./navbar";

export type SkillDockHomeMessages = {
  navExplore: string;
  navBuilder: string;
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
        exploreHref={`/${locale}/docks`}
        exploreLabel={messages.navExplore}
      />
      <section
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-14 pt-8 sm:px-8 lg:pb-20 lg:pt-10"
      >
        <div className="max-w-4xl">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge className="border-cyan-300/20 bg-cyan-300/10 text-cyan-100" variant="outline">
              {messages.highlightA}
            </Badge>
            <Badge className="border-fuchsia-300/20 bg-fuchsia-300/10 text-fuchsia-100" variant="outline">
              {messages.highlightB}
            </Badge>
          </div>
          <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.08em] text-white sm:text-6xl lg:text-7xl">
            {messages.headline}
          </h1>
          <p className="mt-5 max-w-3xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            {messages.subtitle}
          </p>
        </div>

        <FeaturedGuides locale={locale} viewDetailsLabel={messages.viewDetails} />
      </section>

      <section
        className="relative z-10 mx-auto grid w-full max-w-7xl items-start gap-8 px-5 pb-14 sm:px-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:pb-24"
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
                  Prompt/rules builder
                </Badge>
                <Badge className="border-fuchsia-300/20 bg-fuchsia-300/10 text-fuchsia-100" variant="outline">
                  Optional tool
                </Badge>
              </div>
              <h2 className="max-w-3xl text-balance text-4xl font-semibold leading-none tracking-[-0.06em] text-white sm:text-5xl">
                Customize prompt/rules style skills.
              </h2>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
                For prompt-based docks, choose modules and export a universal prompt,
                Cursor rules file, or Codex-style skill pack.
              </p>
            </div>
          </BuilderShell>
        </Suspense>
      </section>
    </main>
  );
}

function FeaturedGuides({
  locale,
  viewDetailsLabel,
}: {
  locale: string;
  viewDetailsLabel: string;
}) {
  const guideDocks = dockTemplates.filter((dock) => dock.dockMode === "guide");

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
      {guideDocks.map((dock) => (
        <Card
          className="min-w-0 border-white/10 bg-slate-950/70 shadow-[0_20px_90px_rgba(34,211,238,0.12)] backdrop-blur-xl"
          key={dock.id}
        >
          <CardHeader>
            <div className="flex flex-wrap gap-2">
              <Badge className="border-cyan-300/20 bg-cyan-300/10 text-cyan-100" variant="outline">
                {dock.projectType}
              </Badge>
              <Badge variant={dock.taxonomy.difficulty === "starter" ? "default" : "secondary"}>
                {dock.taxonomy.difficulty}
              </Badge>
            </div>
            <CardTitle className="text-xl leading-tight text-white">
              {dock.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex h-full flex-col gap-4">
            <p className="text-sm leading-6 text-muted-foreground">
              {dock.shortDescription}
            </p>
            <div className="flex flex-wrap gap-2">
              {dock.guide.supportedTools.slice(0, 3).map((tool) => (
                <Badge className="border-white/10 bg-white/5 text-cyan-100" key={tool} variant="outline">
                  {tool}
                </Badge>
              ))}
            </div>
            <Button asChild className="mt-auto bg-cyan-300 text-slate-950 hover:bg-cyan-200">
              <Link href={`/${locale}/docks/${dock.id}`}>{viewDetailsLabel}</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
