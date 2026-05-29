export type Persona = {
  id: string;
  title: string;
  summary: string;
  signal: string;
  promptRole: string;
  mindset: string;
};

export type Enhancement = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

export type OutputLanguage = {
  locale: "en" | "ja" | "es" | "zh-CN";
  label: string;
  hint: string;
  promptName: string;
};

export const personas: Persona[] = [
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
];

export const enhancements: Enhancement[] = [
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
];

export const outputLanguages: OutputLanguage[] = [
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
