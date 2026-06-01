import Link from "next/link";
import type { ReactNode } from "react";
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
  howToUse: string;
  howToUseIntro: string;
  license: string;
  origin: string;
  personas: string;
  recommendedWorkflow: string;
  safetyNotes: string;
  source: string;
  tags: string;
  title: string;
  intro: string;
  useCases: string;
  viewDetails: string;
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
        <Badge className="border-cyan-300/20 bg-cyan-300/10 text-cyan-100" variant="outline">
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
            className="border-white/10 bg-slate-950/70 shadow-[0_20px_90px_rgba(34,211,238,0.12)] backdrop-blur-xl"
            key={dock.id}
          >
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <CardTitle className="text-xl text-white">{dock.title}</CardTitle>
                <Badge variant={dock.taxonomy.difficulty === "starter" ? "default" : "secondary"}>
                  {dock.taxonomy.difficulty}
                </Badge>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                {dock.shortDescription}
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <DockMetaGrid dock={dock} messages={messages} />
              <StatRow dock={dock} messages={messages} />
              <TagRow tags={dock.taxonomy.tags} />
              <Button asChild className="w-full bg-cyan-300 text-slate-950 hover:bg-cyan-200">
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
          <Badge className="border-fuchsia-300/20 bg-fuchsia-300/10 text-fuchsia-100" variant="outline">
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
        <StatRow dock={dock} messages={messages} />
        <Button asChild className="bg-cyan-300 text-slate-950 hover:bg-cyan-200">
          <Link href={`/${locale}?dock=${dock.id}#builder`}>{messages.backToBuilder}</Link>
        </Button>
      </div>

      <Card className="border-cyan-300/20 bg-slate-950/75 shadow-[0_24px_120px_rgba(34,211,238,0.16)] backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">{messages.details}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <ContentSection title={messages.useCases} items={dock.content.useCases} />

          <Separator className="bg-white/10" />

          <ContentSection title={messages.bestFor} items={dock.content.recommendedFor} />

          <Separator className="bg-white/10" />

          <ContentSection
            title={messages.includedModules}
            items={dock.content.includedModules}
          />

          <Separator className="bg-white/10" />

          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
              {messages.howToUse}
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              {messages.howToUseIntro}
            </p>
          </div>

          <ContentSection
            ordered
            title={messages.recommendedWorkflow}
            items={dock.content.recommendedWorkflow}
          />

          <Separator className="bg-white/10" />

          <ContentSection title={messages.safetyNotes} items={dock.content.safetyNotes} />

          <Separator className="bg-white/10" />

          <Shelf title={messages.personas}>
            {dock.builder.personas.map((persona) => (
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4" key={persona.id}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-semibold text-white">{persona.title}</h2>
                  <Badge variant="secondary">{persona.signal}</Badge>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{persona.summary}</p>
                <p className="mt-3 font-mono text-xs text-cyan-200">{persona.promptRole}</p>
              </div>
            ))}
          </Shelf>

          <Separator className="bg-white/10" />

          <Shelf title={messages.enhancements}>
            {dock.builder.enhancements.map((enhancement) => (
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4" key={enhancement.id}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-semibold text-white">+ {enhancement.label}</h2>
                  {enhancement.enabled ? <Badge>{messages.builder}</Badge> : null}
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {enhancement.description}
                </p>
              </div>
            ))}
          </Shelf>
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
    [messages.source, dock.source.url ?? dock.source.type],
  ];

  return (
    <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground sm:grid-cols-2">
      {items.map(([label, value]) => (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3" key={label}>
          <div className="text-[0.68rem] uppercase tracking-[0.22em] text-cyan-200/80">
            {label}
          </div>
          <div className="mt-1 break-words text-slate-200">{value}</div>
        </div>
      ))}
    </div>
  );
}

function StatRow({
  dock,
  messages,
}: {
  dock: DockTemplate;
  messages: DockPageMessages;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground sm:grid-cols-4">
      <Stat label={messages.personas} value={`${dock.builder.personas.length}`} />
      <Stat label={messages.enhancements} value={`${dock.builder.enhancements.length}`} />
      <Stat label={messages.includedModules} value={`${dock.stats.moduleCount}`} />
      <Stat label={messages.tags} value={`${dock.taxonomy.tags.length}`} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
      <div className="text-lg font-semibold text-white">{value}</div>
      <div className="mt-1 text-[0.68rem] uppercase tracking-[0.18em] text-cyan-200/80">
        {label}
      </div>
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
      <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
        {title}
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

function Shelf({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function TagRow({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge className="border-white/10 bg-white/5 text-cyan-100" key={tag} variant="outline">
          {tag}
        </Badge>
      ))}
    </div>
  );
}
