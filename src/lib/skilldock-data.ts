import { getDefaultDockTemplate } from "./dock-catalog";
import type { Enhancement, OutputLanguage, Persona } from "./skilldock-types";

export type { Enhancement, OutputLanguage, Persona } from "./skilldock-types";

const defaultDock = getDefaultDockTemplate();

export const personas: Persona[] = defaultDock.builder.personas;
export const enhancements: Enhancement[] = defaultDock.builder.enhancements;
export const outputLanguages: OutputLanguage[] = defaultDock.builder.outputLanguages;

export const promptPreviewLines = [
  "dock: skilldock/neon-command-deck",
  "persona:",
  "  role: Senior Frontend Architect",
  "  mindset: pragmatic, precise, design-aware",
  "enhancements:",
  "  - Clean Code Rule",
  "  - Debug Mode",
  "  - Accessibility Review",
  "workflow:",
  "  inspect_context: true",
  "  explain_tradeoffs: concise",
  "  verify_before_handoff: true",
  "output:",
  "  format: implementation-ready guidance",
  "  language: match selected locale",
];
