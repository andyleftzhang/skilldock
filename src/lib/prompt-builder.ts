import {
  getBuilderDockTemplate,
  getDefaultDockTemplate,
} from "./dock-catalog";
import type { OutputLanguage } from "./skilldock-types";

export type BuilderState = {
  selectedDockId: string;
  selectedPersonaId: string;
  selectedEnhancementIds: string[];
  selectedOutputLocale: OutputLanguage["locale"];
};

export function buildPromptConfig(state: BuilderState) {
  const dock = getDockForState(state.selectedDockId);
  const { builder } = dock;
  const persona =
    builder.personas.find((item) => item.id === state.selectedPersonaId) ??
    builder.personas[0];
  const selectedEnhancements = builder.enhancements.filter((item) =>
    state.selectedEnhancementIds.includes(item.id),
  );
  const outputLanguage =
    builder.outputLanguages.find((item) => item.locale === state.selectedOutputLocale) ??
    builder.outputLanguages[0];

  return [
    `dock: skilldock/${dock.id}`,
    "persona:",
    `  role: ${persona.promptRole}`,
    `  mindset: ${persona.mindset}`,
    "enhancements:",
    ...selectedEnhancements.map(
      (enhancement) => `  - ${enhancement.label}: ${enhancement.description}`,
    ),
    "workflow:",
    "  inspect_context: true",
    "  explain_tradeoffs: concise",
    "  verify_before_handoff: true",
    "output:",
    "  format: implementation-ready guidance",
    `  language: ${outputLanguage.promptName}`,
    "",
    `Final instruction: Answer in ${outputLanguage.promptName}.`,
  ].join("\n");
}

export function createInitialBuilderState(
  selectedOutputLocale: OutputLanguage["locale"],
  selectedDockId?: string,
): BuilderState {
  const dock = selectedDockId ? getDockForState(selectedDockId) : getDefaultDockTemplate();

  return {
    selectedDockId: dock.id,
    selectedPersonaId: dock.builder.defaultSelection.personaId,
    selectedEnhancementIds: [...dock.builder.defaultSelection.enhancementIds],
    selectedOutputLocale,
  };
}

export function toggleEnhancement(
  selectedEnhancementIds: string[],
  enhancementId: string,
) {
  if (selectedEnhancementIds.includes(enhancementId)) {
    return selectedEnhancementIds.filter((id) => id !== enhancementId);
  }

  return [...selectedEnhancementIds, enhancementId];
}

function getDockForState(selectedDockId: string) {
  return getBuilderDockTemplate(selectedDockId) ?? getDefaultDockTemplate();
}
