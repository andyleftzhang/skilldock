import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { BuilderShell } from "@/components/skilldock/builder-shell";
import { DeckBackground } from "@/components/skilldock/deck-background";
import { Navbar } from "@/components/skilldock/navbar";
import {
  neonAccentBadgeClass,
  neonBadgeClass,
} from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Builder",
  description: "Compose prompt-style SkillDock exports for compatible Docks.",
  alternates: {
    canonical: "/en/builder",
  },
  openGraph: {
    title: "Builder | SkillDock",
    description: "Compose prompt-style exports for compatible SkillDock Docks.",
    url: "/en/builder",
  },
};

export default async function BuilderPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const landing = await getTranslations("Landing");

  return (
    <main className="relative min-h-svh overflow-hidden bg-background text-foreground">
      <DeckBackground />
      <Navbar
        activeItem="builder"
        builderHref={`/${locale}/builder`}
        builderLabel={landing("nav.builder")}
        exploreHref={`/${locale}/docks`}
        exploreLabel={landing("nav.explore")}
        homeHref={`/${locale}`}
      />
      <section
        className="relative z-10 mx-auto grid w-full max-w-7xl items-start gap-8 px-5 pb-14 pt-8 sm:px-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:pb-24 lg:pt-12"
      >
        <Suspense>
          <BuilderShell
            locale={locale}
            panel={{
              docksLabel: landing("panel.docks"),
              viewDetailsLabel: landing("panel.viewDetails"),
              enhancementsLabel: landing("panel.enhancements"),
              outputLanguageLabel: landing("panel.outputLanguage"),
              personasLabel: landing("panel.personas"),
              shelfA: landing("panel.shelfA"),
              shelfB: landing("panel.shelfB"),
              shelfC: landing("panel.shelfC"),
            }}
            preview={{
              copiedLabel: landing("preview.copied"),
              copyLabel: landing("preview.copy"),
              downloadLabel: landing("preview.download"),
              exportAsLabel: landing("preview.exportAs"),
              exportTargets: [
                {
                  id: "universal-prompt",
                  label: landing("preview.targets.universalPrompt.label"),
                  description: landing("preview.targets.universalPrompt.description"),
                },
                {
                  id: "cursor-rules",
                  label: landing("preview.targets.cursorRules.label"),
                  description: landing("preview.targets.cursorRules.description"),
                },
                {
                  id: "codex-skill-pack",
                  label: landing("preview.targets.codexSkillPack.label"),
                  description: landing("preview.targets.codexSkillPack.description"),
                },
              ],
              format: landing("preview.format"),
              title: landing("preview.title"),
            }}
          >
            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge className={neonBadgeClass} variant="outline">
                  Prompt/rules builder
                </Badge>
                <Badge className={neonAccentBadgeClass} variant="outline">
                  Optional tool
                </Badge>
              </div>
              <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.08em] text-white sm:text-6xl">
                Customize prompt/rules style skills.
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
                Choose a builder-compatible Dock, select the modules you need,
                then copy or download a prompt, Cursor rules file, or Codex-style
                skill pack.
              </p>
            </div>
          </BuilderShell>
        </Suspense>
      </section>
    </main>
  );
}
