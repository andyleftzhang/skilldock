import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <main className="placeholder-shell">
      <h1 className="placeholder-title">{t("title")}</h1>
      <p className="placeholder-status">{t("status")}</p>
    </main>
  );
}
