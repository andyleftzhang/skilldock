import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { DeckBackground } from "@/components/skilldock/deck-background";
import { DockDetail } from "@/components/skilldock/dock-pages";
import { Navbar } from "@/components/skilldock/navbar";
import { dockTemplates, getDockTemplate } from "@/lib/dock-catalog";

type Props = {
  params: Promise<{ locale: string; dockId: string }>;
};

export function generateStaticParams() {
  return dockTemplates.map((dock) => ({ dockId: dock.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, dockId } = await params;
  const dock = getDockTemplate(dockId);

  if (!dock) {
    return {
      title: "Dock not found | SkillDock",
    };
  }

  return {
    title: dock.title,
    description: dock.shortDescription,
    alternates: {
      canonical: `/${locale}/docks/${dock.id}`,
    },
    openGraph: {
      title: `${dock.title} | SkillDock`,
      description: dock.shortDescription,
      url: `/${locale}/docks/${dock.id}`,
      type: "article",
    },
  };
}

export default async function DockDetailPage({ params }: Props) {
  const { locale, dockId } = await params;
  const dock = getDockTemplate(dockId);

  if (!dock) {
    notFound();
  }

  setRequestLocale(locale);
  const landing = await getTranslations("Landing");
  const docks = await getTranslations("Docks");

  return (
    <main className="relative min-h-svh overflow-hidden bg-background text-foreground">
      <DeckBackground />
      <Navbar
        activeItem="explore"
        builderHref={`/${locale}/builder`}
        builderLabel={landing("nav.builder")}
        exploreHref={`/${locale}/docks`}
        exploreLabel={landing("nav.explore")}
        homeHref={`/${locale}`}
      />
      <DockDetail
        dock={dock}
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
          startCommands: docks("startCommands"),
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
