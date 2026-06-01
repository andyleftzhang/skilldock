import type { Enhancement, OutputLanguage, Persona } from "./skilldock-types";

export type DockCategory =
  | "Development"
  | "Testing & Security"
  | "Data & AI"
  | "Documentation"
  | "Business"
  | "Tools";

export type DockSourceType = "github" | "curated" | "manual";

export type DockTemplate = {
  id: string;
  slug: string;
  title: string;
  fileName: string;
  headline: string;
  shortDescription: string;
  longDescription: string;
  source: {
    type: DockSourceType;
    repo?: string;
    url?: string;
    author: string;
    license: string;
    lastUpdated: string;
  };
  stats: {
    popularityLabel: string;
    moduleCount: number;
  };
  taxonomy: {
    category: DockCategory;
    occupation: string;
    tags: string[];
    difficulty: "starter" | "advanced";
  };
  content: {
    useCases: string[];
    includedModules: string[];
    recommendedFor: string[];
    recommendedWorkflow: string[];
    safetyNotes: string[];
  };
  builder: {
    personas: Persona[];
    enhancements: Enhancement[];
    outputLanguages: OutputLanguage[];
    defaultSelection: {
      personaId: string;
      enhancementIds: string[];
      outputLocale: OutputLanguage["locale"];
    };
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
    slug: "neon-command-deck",
    title: "Neon Command Deck",
    fileName: ".cursorrules",
    headline: "Build modular AI coding prompts from reusable command modules.",
    shortDescription:
      "A modular AI skill builder for assembling persona, workflow, and output constraints.",
    longDescription:
      "A starter dock inspired by .cursorrules and AI coding-agent config patterns. It turns common frontend engineering roles, coding rules, and locale constraints into a click-to-compose prompt.",
    source: {
      type: "curated",
      repo: "SkillDock curated starter",
      url: "https://github.com/search?q=.cursorrules&type=repositories",
      author: "SkillDock",
      license: "Curated example",
      lastUpdated: "2026-06-01",
    },
    stats: {
      popularityLabel: "Starter dock",
      moduleCount: 7,
    },
    taxonomy: {
      category: "Development",
      occupation: "Frontend Developer",
      tags: ["frontend", "agents", "prompt-engineering", "config"],
      difficulty: "starter",
    },
    content: {
      useCases: [
        "Create a polished .cursorrules-style prompt for frontend work.",
        "Compose coding assistant behavior without writing prompts from scratch.",
        "Standardize response tone, verification, and output language for AI tools.",
      ],
      includedModules: [
        "Persona presets",
        "Clean code and debugging rules",
        "Accessibility and security review options",
        "Multilingual output constraints",
      ],
      recommendedFor: [
        "Frontend teams",
        "Solo builders",
        "Prompt engineers",
        "AI coding workflow experiments",
      ],
      recommendedWorkflow: [
        "Start with Senior Frontend for UI implementation tasks.",
        "Enable Debug Mode when investigating failures or uncertain code paths.",
        "Add Security Review before shipping auth, data, or configuration changes.",
        "Choose the output language last so the final instruction is explicit.",
      ],
      safetyNotes: [
        "Review generated rules before using them in production repositories.",
        "Treat the dock as a prompt starter, not as a replacement for project-specific engineering standards.",
      ],
    },
    builder: {
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
  },
  {
    id: "code-review-guardrails",
    slug: "code-review-guardrails",
    title: "Code Review Guardrails",
    fileName: "review-prompt.md",
    headline: "Review code changes with risk, regression, and release guardrails.",
    shortDescription:
      "A review-focused prompt dock for risk checks, regression spotting, and handoff quality.",
    longDescription:
      "A review dock for teams that want AI assistants to read code like a high-signal reviewer: concrete findings first, release risk visible, and handoff notes concise.",
    source: {
      type: "curated",
      repo: "SkillDock curated review pack",
      url: "https://github.com/search?q=awesome+code+review+prompts&type=repositories",
      author: "SkillDock",
      license: "Curated example",
      lastUpdated: "2026-06-01",
    },
    stats: {
      popularityLabel: "Advanced dock",
      moduleCount: 5,
    },
    taxonomy: {
      category: "Testing & Security",
      occupation: "Code Reviewer",
      tags: ["code-review", "quality", "security", "handoff"],
      difficulty: "advanced",
    },
    content: {
      useCases: [
        "Generate a code review prompt that focuses on concrete regressions.",
        "Prepare high-signal review notes before merging risky changes.",
        "Create release readiness guidance for handoffs and launch reviews.",
      ],
      includedModules: [
        "Principal reviewer persona",
        "Release readiness persona",
        "Regression mapping rule",
        "Security and handoff checks",
      ],
      recommendedFor: [
        "Maintainers",
        "Engineering leads",
        "QA reviewers",
        "Launch owners",
      ],
      recommendedWorkflow: [
        "Use Principal Reviewer for pull request review and architecture concerns.",
        "Switch to Release Sentinel when the change is close to production.",
        "Keep Regression Map enabled for behavior-changing patches.",
        "Add Handoff Check when the review should produce follow-up tasks.",
      ],
      safetyNotes: [
        "Use findings as review assistance; require human approval before merge decisions.",
        "Keep sensitive repository context inside trusted tooling.",
      ],
    },
    builder: {
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
  },
];

export const defaultDockTemplate = dockTemplates[0];

export function getDockTemplate(id: string) {
  return dockTemplates.find((dock) => dock.id === id);
}

export function getDefaultDockTemplate() {
  return defaultDockTemplate;
}
