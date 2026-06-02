import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { DockTemplate } from "@/lib/dock-catalog";
import {
  cn,
  cyanPanelClass,
  dividerClass,
  neonAccentBadgeClass,
  neonBadgeClass,
  premiumButtonClass,
  quietPanelClass,
  subtleBadgeClass,
} from "@/lib/utils";

export type DockPageMessages = {
  backToDocks: string;
  backToBuilder: string;
  bestFor: string;
  builder: string;
  category: string;
  curated: string;
  details: string;
  difficulty: string;
  enhancements: string;
  fileName: string;
  includedModules: string;
  firstTasks: string;
  howToUse: string;
  howToUseIntro: string;
  license: string;
  origin: string;
  personas: string;
  recommendedWorkflow: string;
  safetyNotes: string;
  source: string;
  supportedTools: string;
  tags: string;
  title: string;
  startCommands: string;
  intro: string;
  useCases: string;
  viewDetails: string;
  whyFeatured: string;
  whatItDoes: string;
};

type DockListProps = {
  docks: DockTemplate[];
  locale: string;
  messages: DockPageMessages;
};

type DockDetailProps = {
  dock: DockTemplate;
  locale: string;
  messages: DockPageMessages;
};

export function DockList({ docks, locale, messages }: DockListProps) {
  return (
    <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-16 pt-8 sm:px-8 lg:pb-24 lg:pt-12">
      <div className="max-w-3xl">
        <Badge className={neonBadgeClass} variant="outline">
          {messages.source}
        </Badge>
        <h1 className="mt-4 text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.08em] text-white sm:text-6xl">
          {messages.title}
        </h1>
        <p className="mt-5 text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          {messages.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {docks.map((dock) => (
          <Card
            className={quietPanelClass}
            key={dock.id}
          >
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <CardTitle className="text-xl text-white">{dock.title}</CardTitle>
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
              <p className="text-sm leading-6 text-muted-foreground">
                {dock.shortDescription}
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <DockMetaGrid dock={dock} messages={messages} />
              <TagRow tags={dock.taxonomy.tags} />
              <Button asChild className={cn("w-full", premiumButtonClass)}>
                <Link href={`/${locale}/docks/${dock.id}`}>{messages.viewDetails}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function DockDetail({ dock, locale, messages }: DockDetailProps) {
  return (
    <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:pb-24 lg:pt-12">
      <div className="flex flex-col gap-5">
        <Link className="text-sm text-cyan-200 hover:text-white" href={`/${locale}/docks`}>
          ← {messages.backToDocks}
        </Link>
        <div>
          <Badge className={neonAccentBadgeClass} variant="outline">
            {dock.fileName}
          </Badge>
          <h1 className="mt-4 text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.08em] text-white sm:text-6xl">
            {dock.headline}
          </h1>
          <p className="mt-5 text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            {dock.longDescription}
          </p>
        </div>
        <DockMetaGrid dock={dock} messages={messages} />
        <TagRow tags={dock.taxonomy.tags} />
        {dock.builder ? (
          <Button asChild className={premiumButtonClass}>
            <Link href={`/${locale}/builder?dock=${dock.id}`}>
              {messages.backToBuilder}
            </Link>
          </Button>
        ) : null}
      </div>

      <Card className={cyanPanelClass}>
        <CardHeader>
          <CardTitle className="text-white">{messages.details}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <ContentSection
            title={messages.whatItDoes}
            items={dock.content.useCases.slice(0, 2)}
          />

          <Separator className={dividerClass} />

          <ContentSection
            title={messages.bestFor}
            items={dock.content.recommendedFor.slice(0, 4)}
          />

          <Separator className={dividerClass} />

          <ContentSection
            title={messages.whyFeatured}
            items={dock.guide.bestPractices.slice(0, 3)}
          />

          <Separator className={dividerClass} />

          <ContentSection title={messages.supportedTools} items={dock.guide.supportedTools} />

          {dock.guide.entryCommands ? (
            <>
              <Separator className={dividerClass} />
              <ContentSection
                title={messages.startCommands}
                items={dock.guide.entryCommands}
              />
            </>
          ) : null}

          <Separator className={dividerClass} />

          <ContentSection
            title={messages.firstTasks}
            items={dock.guide.firstRunExamples.slice(0, 3)}
          />

          <Separator className={dividerClass} />

          <ContentSection title={messages.safetyNotes} items={dock.content.safetyNotes.slice(0, 2)} />

          {dock.source.url ? (
            <>
              <Separator className={dividerClass} />
              <Button asChild className={premiumButtonClass}>
                <Link href={dock.source.url}>{messages.source}</Link>
              </Button>
            </>
          ) : null}
        </CardContent>
      </Card>
    </section>
  );
}

function DockMetaGrid({
  dock,
  messages,
}: {
  dock: DockTemplate;
  messages: DockPageMessages;
}) {
  const items = [
    [messages.fileName, dock.fileName],
    [messages.category, dock.taxonomy.category],
    [messages.curated, dock.source.lastUpdated],
    [messages.origin, dock.source.repo ?? dock.source.author],
    [messages.license, dock.source.license],
  ];

  return (
    <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground sm:grid-cols-2">
      {items.map(([label, value]) => (
        <div
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          key={label}
        >
          <div className="text-[0.68rem] uppercase tracking-[0.22em] text-cyan-200/80">
            {label}
          </div>
          <div className="mt-1 break-words text-slate-200">{value}</div>
        </div>
      ))}
    </div>
  );
}

function ContentSection({
  items,
  ordered = false,
  title,
}: {
  items: string[];
  ordered?: boolean;
  title: string;
}) {
  const List = ordered ? "ol" : "ul";

  return (
    <div className="flex flex-col gap-3">
      <h2 className="flex items-center gap-3 text-base font-semibold tracking-[-0.02em] text-slate-50">
        <span className="h-px w-8 shrink-0 bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-transparent shadow-[0_0_16px_rgba(34,211,238,0.45)]" />
        <span>{title}</span>
      </h2>
      <List className="flex flex-col gap-2 text-sm leading-6 text-muted-foreground">
        {items.map((item) => (
          <li className={ordered ? "ml-5 list-decimal" : "ml-5 list-disc"} key={item}>
            {item}
          </li>
        ))}
      </List>
    </div>
  );
}

function TagRow({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge className={subtleBadgeClass} key={tag} variant="outline">
          {tag}
        </Badge>
      ))}
    </div>
  );
}
