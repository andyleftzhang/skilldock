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
import {
  cn,
  fuchsiaPanelClass,
  neonAccentBadgeClass,
  neonBadgeClass,
  premiumButtonClass,
  quietPanelClass,
  subtleBadgeClass,
} from "@/lib/utils";
import { DeckBackground } from "./deck-background";
import { Navbar } from "./navbar";

export type SkillDockHomeMessages = {
  navExplore: string;
  navBuilder: string;
  headline: string;
  highlightA: string;
  highlightB: string;
  subtitle: string;
  howItWorksEyebrow: string;
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  howItWorksStepATitle: string;
  howItWorksStepADescription: string;
  howItWorksStepBTitle: string;
  howItWorksStepBDescription: string;
  howItWorksStepCTitle: string;
  howItWorksStepCDescription: string;
  viewDetails: string;
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
        builderHref={`/${locale}/builder`}
        builderLabel={messages.navBuilder}
        exploreHref={`/${locale}/docks`}
        exploreLabel={messages.navExplore}
        homeHref={`/${locale}`}
      />
      <section
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-14 pt-8 sm:px-8 lg:pb-20 lg:pt-10"
      >
        <div className="max-w-4xl">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge className={neonBadgeClass} variant="outline">
              {messages.highlightA}
            </Badge>
            <Badge className={neonAccentBadgeClass} variant="outline">
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

        <HowItWorks messages={messages} />

        <FeaturedGuides locale={locale} viewDetailsLabel={messages.viewDetails} />

        <BuilderTeaser locale={locale} messages={messages} />
      </section>
    </main>
  );
}

function HowItWorks({ messages }: { messages: SkillDockHomeMessages }) {
  const steps = [
    {
      title: messages.howItWorksStepATitle,
      description: messages.howItWorksStepADescription,
    },
    {
      title: messages.howItWorksStepBTitle,
      description: messages.howItWorksStepBDescription,
    },
    {
      title: messages.howItWorksStepCTitle,
      description: messages.howItWorksStepCDescription,
    },
  ];

  return (
    <Card className={cn("overflow-hidden", quietPanelClass)}>
      <CardContent className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-7">
        <div>
          <Badge className={neonBadgeClass} variant="outline">
            {messages.howItWorksEyebrow}
          </Badge>
          <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold leading-none tracking-[-0.055em] text-white sm:text-4xl">
            {messages.howItWorksTitle}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            {messages.howItWorksSubtitle}
          </p>
        </div>
        <div className="grid gap-3">
          {steps.map((step) => (
            <div
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              key={step.title}
            >
              <h3 className="text-sm font-semibold text-slate-50">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
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
          className={cn("min-w-0", quietPanelClass)}
          key={dock.id}
        >
          <CardHeader>
            <div className="flex flex-wrap gap-2">
              <Badge className={neonBadgeClass} variant="outline">
                {dock.projectType}
              </Badge>
              <Badge
                className={
                  dock.taxonomy.difficulty === "starter"
                    ? neonBadgeClass
                    : neonAccentBadgeClass
                }
                variant="outline"
              >
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
                <Badge className={subtleBadgeClass} key={tool} variant="outline">
                  {tool}
                </Badge>
              ))}
            </div>
            <Button asChild className={cn("mt-auto", premiumButtonClass)}>
              <Link href={`/${locale}/docks/${dock.id}`}>{viewDetailsLabel}</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function BuilderTeaser({
  locale,
  messages,
}: {
  locale: string;
  messages: SkillDockHomeMessages;
}) {
  return (
    <Card className={cn("overflow-hidden", fuchsiaPanelClass)}>
      <CardContent className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:p-7">
        <div className="max-w-2xl">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge className={neonBadgeClass} variant="outline">
              Prompt/rules builder
            </Badge>
            <Badge className={neonAccentBadgeClass} variant="outline">
              Optional tool
            </Badge>
          </div>
          <h2 className="text-balance text-3xl font-semibold leading-none tracking-[-0.055em] text-white sm:text-4xl">
            Customize prompt-style Docks in a separate workspace.
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
            Use Builder only when a Dock supports prompt or rules export. The guide
            catalog remains the main place to choose and understand skills.
          </p>
        </div>
        <Button asChild className={cn("w-full shrink-0 sm:w-auto", premiumButtonClass)}>
          <Link href={`/${locale}/builder`}>{messages.navBuilder}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
