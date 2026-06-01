import { getTranslations, setRequestLocale } from "next-intl/server";
import { SkillDockHome } from "@/components/skilldock/skilldock-home";

type Props = {
  params: Promise<{ locale: string }>;
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
        navLanguage: t("nav.language"),
        headline: t("hero.headline"),
        highlightA: t("hero.highlightA"),
        highlightB: t("hero.highlightB"),
        subtitle: t("hero.subtitle"),
        previewTitle: t("preview.title"),
        previewFormat: t("preview.format"),
        copy: t("preview.copy"),
        copied: t("preview.copied"),
        download: t("preview.download"),
        docks: t("panel.docks"),
        viewDetails: t("panel.viewDetails"),
        personas: t("panel.personas"),
        enhancements: t("panel.enhancements"),
        outputLanguage: t("panel.outputLanguage"),
        shelfA: t("panel.shelfA"),
        shelfB: t("panel.shelfB"),
        shelfC: t("panel.shelfC"),
      }}
    />
  );
}
