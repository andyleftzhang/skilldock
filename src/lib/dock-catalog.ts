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

const sharedOutputLanguages: OutputLanguage[] = [
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
];

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
    outputLanguages: sharedOutputLanguages,
    defaultSelection: {
      personaId: "senior-frontend",
      enhancementIds: ["clean-code", "debug-mode"],
      outputLocale: "en",
    },
  },
  {
    id: "code-review-guardrails",
    title: "Code Review Guardrails",
    summary:
      "A review-focused prompt dock for risk checks, regression spotting, and handoff quality.",
    sourceType: "prompt-pack",
    difficulty: "advanced",
    tags: ["code-review", "quality", "security", "handoff"],
    promptMeta: {
      origin: "SkillDock curated review pack",
      sourceUrl: "https://github.com/search?q=awesome+code+review+prompts&type=repositories",
      license: "Curated example",
    },
    personas: [
      {
        id: "principal-reviewer",
        title: "Principal Reviewer",
        summary: "Architecture, regressions, security, maintainability.",
        signal: "PR",
        promptRole: "Principal Code Reviewer",
        mindset: "skeptical, precise, evidence-first",
      },
      {
        id: "release-sentinel",
        title: "Release Sentinel",
        summary: "Production readiness, rollback risk, operational clarity.",
        signal: "RX",
        promptRole: "Release Readiness Reviewer",
        mindset: "risk-aware, concise, launch-focused",
      },
    ],
    enhancements: [
      {
        id: "regression-map",
        label: "Regression Map",
        description: "Identify likely behavior changes and missing regression coverage.",
        enabled: true,
      },
      {
        id: "security-review",
        label: "Security Review",
        description: "Call out risky data flows and unsafe defaults.",
        enabled: true,
      },
      {
        id: "handoff-check",
        label: "Handoff Check",
        description: "Summarize open risks, verification evidence, and follow-up work.",
        enabled: false,
      },
    ],
    outputLanguages: sharedOutputLanguages,
    defaultSelection: {
      personaId: "principal-reviewer",
      enhancementIds: ["regression-map", "security-review"],
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
