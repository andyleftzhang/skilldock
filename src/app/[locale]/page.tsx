import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SkillDockHome } from "@/components/skilldock/skilldock-home";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Curated AI Skills and Agent Workflow Guides",
  description:
    "Find high-signal AI skill repositories, understand what each skill does, and learn how to install and try it in your own AI coding tool.",
  alternates: {
    canonical: "/en",
  },
  openGraph: {
    title: "SkillDock | Curated AI Skills and Agent Workflow Guides",
    description:
      "Find curated AI skill repositories with practical install guidance and first-run examples.",
    url: "/en",
  },
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Landing");

  return (
    <SkillDockHome
      locale={locale}
      messages={{
        navExplore: t("nav.explore"),
        navBuilder: t("nav.builder"),
        headline: t("hero.headline"),
        highlightA: t("hero.highlightA"),
        highlightB: t("hero.highlightB"),
        subtitle: t("hero.subtitle"),
        howItWorksEyebrow: t("howItWorks.eyebrow"),
        howItWorksTitle: t("howItWorks.title"),
        howItWorksSubtitle: t("howItWorks.subtitle"),
        howItWorksStepATitle: t("howItWorks.stepA.title"),
        howItWorksStepADescription: t("howItWorks.stepA.description"),
        howItWorksStepBTitle: t("howItWorks.stepB.title"),
        howItWorksStepBDescription: t("howItWorks.stepB.description"),
        howItWorksStepCTitle: t("howItWorks.stepC.title"),
        howItWorksStepCDescription: t("howItWorks.stepC.description"),
        viewDetails: t("panel.viewDetails"),
      }}
    />
  );
}
