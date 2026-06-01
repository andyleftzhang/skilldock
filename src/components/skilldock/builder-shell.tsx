"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  builderDockTemplates,
  getBuilderDockTemplate,
} from "@/lib/dock-catalog";
import {
  createInitialBuilderState,
  toggleEnhancement,
} from "@/lib/prompt-builder";
import type { BuilderState } from "@/lib/prompt-builder";
import { buildSkillExport } from "@/lib/skill-exporter";
import type { ExportTargetId } from "@/lib/skill-exporter";
import type { OutputLanguage } from "@/lib/skilldock-types";
import { DockingPanel } from "./docking-panel";
import { PromptPreview } from "./prompt-preview";
import type { ExportTargetOption } from "./prompt-preview";

type BuilderShellProps = {
  children: ReactNode;
  locale: string;
  preview: {
    title: string;
    format: string;
    copyLabel: string;
    copiedLabel: string;
    downloadLabel: string;
    exportAsLabel: string;
    exportTargets: ExportTargetOption[];
  };
  panel: {
    docksLabel: string;
    viewDetailsLabel: string;
    personasLabel: string;
    enhancementsLabel: string;
    outputLanguageLabel: string;
    shelfA: string;
    shelfB: string;
    shelfC: string;
  };
};

const supportedOutputLocales = new Set(["en"]);

export function BuilderShell({
  children,
  locale,
  panel,
  preview,
}: BuilderShellProps) {
  const searchParams = useSearchParams();
  const initialDockId = searchParams.get("dock") ?? undefined;
  const initialLocale = supportedOutputLocales.has(locale)
    ? (locale as OutputLanguage["locale"])
    : "en";
  const [builderState, setBuilderState] = useState<BuilderState>(() =>
    createInitialBuilderState(initialLocale, initialDockId),
  );
  const [selectedExportTargetId, setSelectedExportTargetId] =
    useState<ExportTargetId>("universal-prompt");

  const selectedDock =
    getBuilderDockTemplate(builderState.selectedDockId) ?? builderDockTemplates[0];
  const exportArtifact = useMemo(
    () => buildSkillExport(builderState, selectedExportTargetId),
    [builderState, selectedExportTargetId],
  );

  return (
    <>
      <div className="min-w-0 flex flex-col gap-6">
        {children}
        <DockExplorer
          currentDockId={selectedDock.id}
          label={panel.docksLabel}
          locale={locale}
          onDockSelect={(dockId) => {
            const dock = getBuilderDockTemplate(dockId) ?? builderDockTemplates[0];
            const { builder } = dock;

            setBuilderState((current) => ({
              selectedDockId: dock.id,
              selectedPersonaId: builder.defaultSelection.personaId,
              selectedEnhancementIds: [...builder.defaultSelection.enhancementIds],
              selectedOutputLocale: builder.outputLanguages.some(
                (language) => language.locale === current.selectedOutputLocale,
              )
                ? current.selectedOutputLocale
                : builder.defaultSelection.outputLocale,
            }));
          }}
          viewDetailsLabel={panel.viewDetailsLabel}
        />
        <PromptPreview
          copiedLabel={preview.copiedLabel}
          copyLabel={preview.copyLabel}
          downloadLabel={preview.downloadLabel}
          exportArtifact={exportArtifact}
          exportAsLabel={preview.exportAsLabel}
          exportTargets={preview.exportTargets}
          format={preview.format}
          onExportTargetChange={setSelectedExportTargetId}
          selectedExportTargetId={selectedExportTargetId}
          title={preview.title}
        />
      </div>
      <DockingPanel
        enhancements={selectedDock.builder.enhancements}
        enhancementsLabel={panel.enhancementsLabel}
        onEnhancementToggle={(enhancementId) => {
          setBuilderState((current) => ({
            ...current,
            selectedEnhancementIds: toggleEnhancement(
              current.selectedEnhancementIds,
              enhancementId,
            ),
          }));
        }}
        onOutputLanguageChange={(outputLocale) => {
          setBuilderState((current) => ({
            ...current,
            selectedOutputLocale: outputLocale,
          }));
        }}
        onPersonaSelect={(personaId) => {
          setBuilderState((current) => ({
            ...current,
            selectedPersonaId: personaId,
          }));
        }}
        outputLanguageLabel={panel.outputLanguageLabel}
        outputLanguages={selectedDock.builder.outputLanguages}
        personas={selectedDock.builder.personas}
        personasLabel={panel.personasLabel}
        selectedEnhancementIds={builderState.selectedEnhancementIds}
        selectedOutputLocale={builderState.selectedOutputLocale}
        selectedPersonaId={builderState.selectedPersonaId}
        shelfA={panel.shelfA}
        shelfB={panel.shelfB}
        shelfC={panel.shelfC}
      />
    </>
  );
}

function DockExplorer({
  currentDockId,
  label,
  locale,
  onDockSelect,
  viewDetailsLabel,
}: {
  currentDockId: string;
  label: string;
  locale: string;
  onDockSelect: (dockId: string) => void;
  viewDetailsLabel: string;
}) {
  return (
    <Card className="min-w-0 border-violet-300/20 bg-slate-950/60 shadow-[0_18px_80px_rgba(139,92,246,0.12)] backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-base text-white">{label}</CardTitle>
      </CardHeader>
      <CardContent className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
        {builderDockTemplates.map((dock) => (
          <div
            className={[
              "min-w-0 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left transition hover:border-violet-300/50 hover:bg-violet-300/10",
              dock.id === currentDockId ? "border-violet-300/50 bg-violet-300/10" : "",
            ].join(" ")}
            key={dock.id}
          >
            <button
              aria-pressed={dock.id === currentDockId}
              className="w-full min-w-0 text-left"
              onClick={() => onDockSelect(dock.id)}
              type="button"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-sm font-semibold text-white">{dock.title}</span>
                <Badge variant={dock.taxonomy.difficulty === "starter" ? "default" : "secondary"}>
                  {dock.fileName}
                </Badge>
              </div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {dock.shortDescription}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[0.68rem] text-muted-foreground">
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1">
                  {dock.builder.personas.length} personas
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1">
                  {dock.builder.enhancements.length} rules
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1">
                  {dock.taxonomy.category}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1">
                  {dock.stats.popularityLabel}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {dock.taxonomy.tags.map((tag) => (
                  <Badge
                    className="border-white/10 bg-white/5 text-[0.68rem] text-cyan-100"
                    key={tag}
                    variant="outline"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </button>
            <div className="mt-3">
              <Link
                className="text-xs font-medium text-cyan-200 transition-colors hover:text-white"
                href={`/${locale}/docks/${dock.id}`}
              >
                {viewDetailsLabel}
              </Link>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
