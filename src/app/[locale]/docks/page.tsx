import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DeckBackground } from "@/components/skilldock/deck-background";
import { DockList } from "@/components/skilldock/dock-pages";
import { Navbar } from "@/components/skilldock/navbar";
import { dockTemplates } from "@/lib/dock-catalog";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Explore Docks | SkillDock",
  description: "Browse reusable AI skill templates for SkillDock.",
};

export default async function DocksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const landing = await getTranslations("Landing");
  const docks = await getTranslations("Docks");

  return (
    <main className="relative min-h-svh overflow-hidden bg-background text-foreground">
      <DeckBackground />
      <Navbar
        activeItem="explore"
        builderHref={`/${locale}#builder`}
        builderLabel={landing("nav.builder")}
        exploreHref={`/${locale}/docks`}
        exploreLabel={landing("nav.explore")}
      />
      <DockList
        docks={dockTemplates}
        locale={locale}
        messages={{
          backToBuilder: docks("backToBuilder"),
          backToDocks: docks("backToDocks"),
          bestFor: docks("bestFor"),
          builder: docks("builder"),
          category: docks("category"),
          curated: docks("curated"),
          details: docks("details"),
          difficulty: docks("difficulty"),
          enhancements: docks("enhancements"),
          fileName: docks("fileName"),
          firstTasks: docks("firstTasks"),
          howToUse: docks("howToUse"),
          howToUseIntro: docks("howToUseIntro"),
          includedModules: docks("includedModules"),
          intro: docks("intro"),
          license: docks("license"),
          origin: docks("origin"),
          personas: docks("personas"),
          recommendedWorkflow: docks("recommendedWorkflow"),
          safetyNotes: docks("safetyNotes"),
          source: docks("source"),
          supportedTools: docks("supportedTools"),
          tags: docks("tags"),
          title: docks("title"),
          useCases: docks("useCases"),
          viewDetails: docks("viewDetails"),
          whyFeatured: docks("whyFeatured"),
          whatItDoes: docks("whatItDoes"),
        }}
      />
    </main>
  );
}
