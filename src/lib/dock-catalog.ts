import type { Enhancement, OutputLanguage, Persona } from "./skilldock-types";

export type DockSourceType = "cursor-rules" | "prompt-pack" | "agent-config";

export type DockTemplate = {
  id: string;
  title: string;
  summary: string;
  sourceType: DockSourceType;
  difficulty: "starter" | "advanced";
  tags: string[];
  promptMeta: {
    origin: string;
    sourceUrl: string;
    license: string;
  };
  personas: Persona[];
  enhancements: Enhancement[];
  outputLanguages: OutputLanguage[];
  defaultSelection: {
    personaId: string;
    enhancementIds: string[];
    outputLocale: OutputLanguage["locale"];
  };
};

export const dockTemplates: DockTemplate[] = [
  {
    id: "neon-command-deck",
    title: "Neon Command Deck",
    summary:
      "A modular AI skill builder for assembling persona, workflow, and output constraints.",
    sourceType: "cursor-rules",
    difficulty: "starter",
    tags: ["frontend", "agents", "prompt-engineering", "config"],
    promptMeta: {
      origin: "SkillDock curated starter",
      sourceUrl: "https://github.com/search?q=.cursorrules&type=repositories",
      license: "Curated example",
    },
    personas: [
      {
        id: "senior-frontend",
        title: "Senior Frontend",
        summary: "React, design systems, accessibility, performance.",
        signal: "UI",
        promptRole: "Senior Frontend Architect",
        mindset: "pragmatic, precise, design-aware",
      },
      {
        id: "python-agent",
        title: "Python Agent",
        summary: "Automation, scripts, data handling, tool orchestration.",
        signal: "AI",
        promptRole: "Python Agent",
        mindset: "automation-first, reliable, data-aware",
      },
      {
        id: "prompt-engineer",
        title: "Prompt Engineer",
        summary: "Structured prompts, constraints, role framing.",
        signal: "PX",
        promptRole: "Prompt Engineer",
        mindset: "clear, structured, constraint-aware",
      },
      {
        id: "code-reviewer",
        title: "Code Reviewer",
        summary: "Risk analysis, regressions, maintainability checks.",
        signal: "QA",
        promptRole: "Code Reviewer",
        mindset: "skeptical, evidence-led, maintainability-focused",
      },
    ],
    enhancements: [
      {
        id: "clean-code",
        label: "Clean Code Rule",
        description: "Prefer readable abstractions and small focused modules.",
        enabled: true,
      },
      {
        id: "debug-mode",
        label: "Debug Mode",
        description: "Explain assumptions, inspect failures, verify fixes.",
        enabled: true,
      },
      {
        id: "security-review",
        label: "Security Review",
        description: "Call out risky data flows and unsafe defaults.",
        enabled: false,
      },
    ],
    outputLanguages: [
      {
        locale: "en",
        label: "English",
        hint: "Global default",
        promptName: "English",
      },
      {
        locale: "ja",
        label: "日本語",
        hint: "Localized output",
        promptName: "Japanese",
      },
      {
        locale: "es",
        label: "Español",
        hint: "Spanish output",
        promptName: "Spanish",
      },
      {
        locale: "zh-CN",
        label: "简体中文",
        hint: "Chinese output",
        promptName: "Simplified Chinese",
      },
    ],
    defaultSelection: {
      personaId: "senior-frontend",
      enhancementIds: ["clean-code", "debug-mode"],
      outputLocale: "en",
    },
  },
];

export const defaultDockTemplate = dockTemplates[0];

export function getDockTemplate(id: string) {
  return dockTemplates.find((dock) => dock.id === id);
}

export function getDefaultDockTemplate() {
  return defaultDockTemplate;
}
