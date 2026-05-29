"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { OutputLanguage } from "@/lib/skilldock-data";
import {
  buildPromptConfig,
  createInitialBuilderState,
  toggleEnhancement,
} from "@/lib/prompt-builder";
import type { BuilderState } from "@/lib/prompt-builder";
import { DockingPanel } from "./docking-panel";
import { PromptPreview } from "./prompt-preview";

type BuilderShellProps = {
  children: ReactNode;
  locale: string;
  preview: {
    title: string;
    format: string;
    copyLabel: string;
    copiedLabel: string;
    downloadLabel: string;
  };
  panel: {
    personasLabel: string;
    enhancementsLabel: string;
    outputLanguageLabel: string;
    shelfA: string;
    shelfB: string;
    shelfC: string;
  };
};

const supportedOutputLocales = new Set(["en", "ja", "es", "zh-CN"]);

export function BuilderShell({ children, locale, panel, preview }: BuilderShellProps) {
  const initialLocale = supportedOutputLocales.has(locale)
    ? (locale as OutputLanguage["locale"])
    : "en";
  const [builderState, setBuilderState] = useState<BuilderState>(() =>
    createInitialBuilderState(initialLocale),
  );

  const promptConfig = useMemo(() => buildPromptConfig(builderState), [builderState]);

  return (
    <>
      <div className="flex flex-col gap-6">
        {children}
        <PromptPreview
          copiedLabel={preview.copiedLabel}
          copyLabel={preview.copyLabel}
          downloadLabel={preview.downloadLabel}
          format={preview.format}
          promptConfig={promptConfig}
          title={preview.title}
        />
      </div>
      <DockingPanel
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
