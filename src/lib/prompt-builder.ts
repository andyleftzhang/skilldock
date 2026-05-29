import type { OutputLanguage } from "./skilldock-data";
import { enhancements, outputLanguages, personas } from "./skilldock-data";

export type BuilderState = {
  selectedPersonaId: string;
  selectedEnhancementIds: string[];
  selectedOutputLocale: OutputLanguage["locale"];
};

export function buildPromptConfig(state: BuilderState) {
  const persona = personas.find((item) => item.id === state.selectedPersonaId) ?? personas[0];
  const selectedEnhancements = enhancements.filter((item) =>
    state.selectedEnhancementIds.includes(item.id),
  );
  const outputLanguage =
    outputLanguages.find((item) => item.locale === state.selectedOutputLocale) ??
    outputLanguages[0];

  return [
    "dock: skilldock/neon-command-deck",
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
): BuilderState {
  return {
    selectedPersonaId: personas[0].id,
    selectedEnhancementIds: enhancements
      .filter((enhancement) => enhancement.enabled)
      .map((enhancement) => enhancement.id),
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
