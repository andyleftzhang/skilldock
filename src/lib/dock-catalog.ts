import type { Enhancement, OutputLanguage, Persona } from "./skilldock-types";

export type DockCategory =
  | "Development"
  | "Testing & Security"
  | "Data & AI"
  | "Documentation"
  | "Business"
  | "Tools";

export type DockSourceType = "github" | "curated" | "manual";
export type DockMode = "guide" | "builder";
export type DockProjectType =
  | "agent-skill-library"
  | "agent-workflow"
  | "command-suite"
  | "prompt-rules"
  | "skill-pack";

export type DockTemplate = {
  id: string;
  dockMode: DockMode;
  projectType: DockProjectType;
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
  guide: {
    supportedTools: string[];
    installGuide: string[];
    firstRunExamples: string[];
    bestPractices: string[];
    commonMistakes: string[];
    whenNotToUse: string[];
  };
  builder?: {
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

export type DockBuilder = NonNullable<DockTemplate["builder"]>;
export type BuilderDockTemplate = DockTemplate & { builder: DockBuilder };

const sharedOutputLanguages: OutputLanguage[] = [
  {
    locale: "en",
    label: "English",
    hint: "Global default",
    promptName: "English",
  },
];

export const dockTemplates: DockTemplate[] = [
  {
    id: "neon-command-deck",
    dockMode: "builder",
    projectType: "prompt-rules",
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
    guide: {
      supportedTools: ["Cursor", "Windsurf", "Codex", "ChatGPT", "Claude"],
      installGuide: [
        "Use the Builder to choose persona, rules, output language, and export target.",
        "Copy the Universal Prompt into a system prompt or project instructions field.",
        "For Cursor, export Cursor Rules and save the file as `.cursorrules` at the project root.",
      ],
      firstRunExamples: [
        "Use this project instruction to implement a responsive landing page.",
        "Review this component and suggest concrete accessibility fixes.",
      ],
      bestPractices: [
        "Keep only the rules that matter for the current project; too many rules weaken the signal.",
        "Put project-specific conventions below the generated config so they override generic advice.",
      ],
      commonMistakes: [
        "Treating a generated prompt as a permanent coding standard without reviewing it.",
        "Mixing conflicting output language and formatting instructions.",
      ],
      whenNotToUse: [
        "Do not use as a replacement for repository-specific architecture docs.",
        "Avoid it when your AI tool already has a richer installable skill for the same workflow.",
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
    dockMode: "builder",
    projectType: "prompt-rules",
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
    guide: {
      supportedTools: ["Cursor", "Codex", "ChatGPT", "Claude"],
      installGuide: [
        "Choose the review persona and review rules in the Builder.",
        "Export Universal Prompt for chat-based reviews, or Cursor Rules for repository-level guidance.",
        "Paste the generated content before asking the AI to review a diff or branch.",
      ],
      firstRunExamples: [
        "Review this diff and lead with concrete regressions.",
        "Check this branch for release risks and missing verification.",
      ],
      bestPractices: [
        "Ask for findings first, then questions, then a brief summary.",
        "Provide the actual diff or changed files; vague review prompts produce vague reviews.",
      ],
      commonMistakes: [
        "Using review prompts without giving the AI enough code context.",
        "Letting the AI approve a risky change without human review.",
      ],
      whenNotToUse: [
        "Do not use it as the final authority for security-sensitive releases.",
        "Avoid it for codebases where the AI cannot access the changed files.",
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
  {
    id: "anthropic-agent-skills",
    dockMode: "guide",
    projectType: "agent-skill-library",
    slug: "anthropic-agent-skills",
    title: "Anthropic Agent Skills",
    fileName: "skills/*/SKILL.md",
    headline: "Official examples for reusable Claude skills.",
    shortDescription:
      "A curated guide to Anthropic's official skill folders for documents, spreadsheets, slides, and skill creation.",
    longDescription:
      "Anthropic Agent Skills are folder-based capabilities that package instructions, scripts, and resources so Claude can load the right behavior for a task.",
    source: {
      type: "github",
      repo: "anthropics/skills",
      url: "https://github.com/anthropics/skills/tree/main/skills",
      author: "Anthropic",
      license: "Source repository license",
      lastUpdated: "2026-06-01",
    },
    stats: {
      popularityLabel: "Official examples",
      moduleCount: 8,
    },
    taxonomy: {
      category: "Tools",
      occupation: "Knowledge Worker",
      tags: ["claude", "official", "documents", "productivity", "skill-library"],
      difficulty: "starter",
    },
    content: {
      useCases: [
        "Understand how official Claude skills are structured before installing or writing your own.",
        "Find task-specific document, spreadsheet, slide, and skill-authoring workflows.",
        "Learn what belongs in a reusable skill folder instead of a one-off prompt.",
      ],
      includedModules: [
        "SKILL.md examples",
        "Document workflows",
        "Spreadsheet and slide workflows",
        "Skill creation patterns",
      ],
      recommendedFor: [
        "Claude users",
        "Operators handling office documents",
        "Teams creating internal AI workflows",
        "People learning the skill folder format",
      ],
      recommendedWorkflow: [
        "Start with one concrete task type, such as PDF extraction or slide generation.",
        "Read the skill's SKILL.md before installing so you understand when it triggers.",
        "Try one small file first, then expand to production documents.",
        "Keep sensitive documents inside trusted environments.",
      ],
      safetyNotes: [
        "Review any scripts or resources inside a skill before running them.",
        "Avoid uploading private business documents to tools or accounts you do not control.",
      ],
    },
    guide: {
      supportedTools: ["Claude Code", "Claude.ai", "Claude API"],
      installGuide: [
        "Open the Anthropic skills repository and choose the skill folder that matches your task.",
        "Read its SKILL.md to understand the trigger, workflow, and required files.",
        "Install or copy only the skill folders you actually need; do not start with the whole library.",
        "Run a small sample task and confirm the generated output before using real work files.",
      ],
      firstRunExamples: [
        "Use the PDF skill to extract fields from this sample form.",
        "Use the spreadsheet skill to inspect this workbook and summarize anomalies.",
        "Use the skill creator pattern to draft a reusable internal support workflow.",
      ],
      bestPractices: [
        "Treat official examples as reference implementations, then adapt them to your own tool and data policy.",
        "Prefer one narrow skill per recurring task instead of one giant do-everything instruction.",
        "Document required files, scripts, and expected output so teammates know how to invoke it.",
      ],
      commonMistakes: [
        "Installing every skill before knowing which workflow you need.",
        "Skipping the SKILL.md and assuming all skills behave like prompts.",
        "Testing on confidential files before validating the workflow on safe samples.",
      ],
      whenNotToUse: [
        "Do not use when your tool does not support folder-based skills or equivalent project instructions.",
        "Avoid it for one-off casual chat tasks where a short prompt is enough.",
      ],
    },
  },
  {
    id: "superpowers",
    dockMode: "guide",
    projectType: "agent-workflow",
    slug: "superpowers",
    title: "Superpowers",
    fileName: "skills/*/SKILL.md",
    headline: "Agentic coding workflows for planning, TDD, debugging, and review.",
    shortDescription:
      "A practical guide to using Superpowers as a repeatable software development workflow layer for coding agents.",
    longDescription:
      "Superpowers is a collection of composable development skills that teach coding agents to plan, test, debug, review, and finish work with stronger process discipline.",
    source: {
      type: "github",
      repo: "obra/superpowers",
      url: "https://github.com/obra/superpowers",
      author: "Jesse Vincent / contributors",
      license: "Source repository license",
      lastUpdated: "2026-06-01",
    },
    stats: {
      popularityLabel: "Workflow system",
      moduleCount: 12,
    },
    taxonomy: {
      category: "Development",
      occupation: "Software Developer",
      tags: ["coding-agent", "workflow", "tdd", "debugging", "review"],
      difficulty: "advanced",
    },
    content: {
      useCases: [
        "Make an AI coding agent follow a disciplined feature-building process.",
        "Force design, planning, testing, debugging, and verification gates.",
        "Reduce shallow fixes and unverified completion claims.",
      ],
      includedModules: [
        "Brainstorming",
        "Writing plans",
        "Test-driven development",
        "Systematic debugging",
        "Code review workflows",
        "Branch finishing workflows",
      ],
      recommendedFor: [
        "Codex users",
        "Claude Code users",
        "Senior engineers building with coding agents",
        "Teams that want repeatable AI development process",
      ],
      recommendedWorkflow: [
        "Start with brainstorming for any meaningful feature or behavior change.",
        "Move to writing plans once the design is clear.",
        "Use TDD for implementation and systematic debugging for failures.",
        "Run verification before accepting completion or making a release decision.",
      ],
      safetyNotes: [
        "This is a workflow layer, not a guarantee that the agent is correct.",
        "Do not let the agent bypass human review for security or production changes.",
      ],
    },
    guide: {
      supportedTools: ["Codex", "Claude Code", "Cursor", "Gemini CLI", "OpenCode"],
      installGuide: [
        "Choose the installation path for your AI coding tool.",
        "Install the Superpowers plugin or copy the matching skill folders into your tool's skill/plugin location.",
        "Restart or reload the agent session so the skills are discoverable.",
        "Begin with a planning request instead of a coding request to let the workflow engage.",
      ],
      firstRunExamples: [
        "I've got an idea for a feature. Help me shape it before implementation.",
        "This test is failing. Use systematic debugging before proposing a fix.",
        "Review this branch and prioritize real regressions over style opinions.",
      ],
      bestPractices: [
        "Use Superpowers when the task has real uncertainty, risk, or multiple steps.",
        "Let the agent slow down for design and verification instead of optimizing for first-response speed.",
        "Keep the workflow visible: ask which skill is active and what gate comes next.",
      ],
      commonMistakes: [
        "Expecting Superpowers to automatically write better code without giving it repository context.",
        "Skipping the design and verification gates because the task feels small.",
        "Using every skill all the time instead of the one matching the current phase.",
      ],
      whenNotToUse: [
        "Avoid it for tiny one-line edits where process overhead is larger than the work.",
        "Do not use it as a replacement for team code review or production release checks.",
      ],
    },
  },
  {
    id: "gstack",
    dockMode: "guide",
    projectType: "command-suite",
    slug: "gstack",
    title: "GStack",
    fileName: "slash commands",
    headline: "A Claude Code command suite that acts like a virtual product team.",
    shortDescription:
      "A beginner guide to GStack's Claude Code command workflows for product planning, review, QA, and launch support.",
    longDescription:
      "GStack packages specialist roles and slash commands so Claude Code can simulate a lightweight product, engineering, QA, and leadership team around your project.",
    source: {
      type: "github",
      repo: "garrytan/gstack",
      url: "https://github.com/garrytan/gstack",
      author: "Garry Tan / contributors",
      license: "Source repository license",
      lastUpdated: "2026-06-01",
    },
    stats: {
      popularityLabel: "Command suite",
      moduleCount: 23,
    },
    taxonomy: {
      category: "Business",
      occupation: "Founder",
      tags: ["claude-code", "slash-commands", "product", "qa", "startup"],
      difficulty: "starter",
    },
    content: {
      useCases: [
        "Get product and engineering feedback from a command-driven Claude Code setup.",
        "Run planning, QA, review, and launch-style workflows without inventing prompts.",
        "Help solo builders simulate missing team roles during early product work.",
      ],
      includedModules: [
        "Office hours style guidance",
        "CEO/product review commands",
        "Code review commands",
        "QA workflows",
        "Launch support roles",
      ],
      recommendedFor: [
        "Founders",
        "Solo builders",
        "Claude Code users",
        "Small teams without dedicated product or QA support",
      ],
      recommendedWorkflow: [
        "Install it only if Claude Code is already part of your development workflow.",
        "Start with a product or planning command before jumping into implementation.",
        "Use review and QA commands before shipping user-facing changes.",
        "Treat outputs as structured feedback, then decide what to act on.",
      ],
      safetyNotes: [
        "Command output is guidance, not executive approval.",
        "Keep private company data inside trusted Claude Code environments.",
      ],
    },
    guide: {
      supportedTools: ["Claude Code"],
      installGuide: [
        "Install GStack into your Claude Code command/skill setup following the repository instructions.",
        "Restart Claude Code so slash commands are loaded.",
        "Run one discovery command first to confirm the command suite is available.",
        "Use one command per workflow stage instead of stacking many commands at once.",
      ],
      firstRunExamples: [
        "/office-hours",
        "/plan-ceo-review",
        "/review",
        "/qa",
      ],
      bestPractices: [
        "Use product commands before implementation when requirements are still fuzzy.",
        "Use QA commands after the app is runnable so feedback is grounded in actual behavior.",
        "Keep command outputs short and convert decisions into explicit tasks.",
      ],
      commonMistakes: [
        "Running review commands without giving Claude Code the relevant files or branch context.",
        "Treating multiple simulated roles as independent human reviewers.",
        "Using founder-style feedback as a substitute for real user validation.",
      ],
      whenNotToUse: [
        "Avoid it if you do not use Claude Code.",
        "Do not use it for legal, hiring, financial, or investor-facing decisions without human review.",
      ],
    },
  },
  {
    id: "minimax-skills",
    dockMode: "guide",
    projectType: "agent-skill-library",
    slug: "minimax-skills",
    title: "MiniMax Skills",
    fileName: "skills/*",
    headline: "A multi-tool skill library for frontend, fullstack, documents, slides, and media.",
    shortDescription:
      "A practical guide to choosing and installing MiniMax skills across Claude Code, Cursor, Codex, and OpenCode.",
    longDescription:
      "MiniMax Skills is a broad skill library with coding, document, spreadsheet, presentation, and multimodal workflows that can be adapted across multiple AI development tools.",
    source: {
      type: "github",
      repo: "MiniMax-AI/skills",
      url: "https://github.com/MiniMax-AI/skills",
      author: "MiniMax AI",
      license: "Source repository license",
      lastUpdated: "2026-06-01",
    },
    stats: {
      popularityLabel: "Multi-tool library",
      moduleCount: 20,
    },
    taxonomy: {
      category: "Tools",
      occupation: "AI Power User",
      tags: ["minimax", "documents", "frontend", "multimodal", "skill-library"],
      difficulty: "advanced",
    },
    content: {
      useCases: [
        "Find a ready-made skill for frontend, fullstack, document, spreadsheet, or presentation work.",
        "Install only the MiniMax skills that match your current tool and task.",
        "Use multimodal and office automation skills with clearer expectations.",
      ],
      includedModules: [
        "Frontend development",
        "Fullstack development",
        "PPTX generation",
        "XLSX and DOCX workflows",
        "Media and multimodal utilities",
      ],
      recommendedFor: [
        "Cursor users",
        "Codex users",
        "Claude Code users",
        "Teams building document and media automation workflows",
      ],
      recommendedWorkflow: [
        "Pick one concrete target skill first, such as frontend-dev or pptx-generator.",
        "Check whether it requires MiniMax credentials or other environment variables.",
        "Install into the AI tool you actually use, then run the smallest sample task.",
        "Document the working setup before adding more skills.",
      ],
      safetyNotes: [
        "Some skills may require API keys or external service access.",
        "Do not paste secrets into prompts; use your tool's supported secret or environment mechanism.",
      ],
    },
    guide: {
      supportedTools: ["Claude Code", "Cursor", "Codex", "OpenCode"],
      installGuide: [
        "Choose the exact skill folder for the workflow you need.",
        "Check the README or skill file for required API keys and tool compatibility.",
        "Install the selected skill into your AI tool's skill/plugin location.",
        "Run a sample task with non-sensitive input before relying on it for real documents.",
      ],
      firstRunExamples: [
        "Use frontend-dev to build a responsive pricing section.",
        "Use pptx-generator to create a 5-slide investor update deck.",
        "Use minimax-xlsx to inspect this sample workbook and explain formulas.",
      ],
      bestPractices: [
        "Start with one skill and one sample artifact; avoid installing the whole library at once.",
        "Check credential requirements before promising a workflow to a teammate.",
        "Pair office-file skills with a manual review pass for formatting and factual accuracy.",
      ],
      commonMistakes: [
        "Installing skills without configuring the required API key.",
        "Assuming every skill works identically across Claude Code, Cursor, Codex, and OpenCode.",
        "Skipping output review for generated documents and presentations.",
      ],
      whenNotToUse: [
        "Avoid skills that need external services when your environment cannot provide credentials safely.",
        "Do not use generated office documents as final deliverables without human QA.",
      ],
    },
  },
];

export const builderDockTemplates: BuilderDockTemplate[] = dockTemplates.filter(
  (dock): dock is BuilderDockTemplate => Boolean(dock.builder),
);
export const defaultDockTemplate = builderDockTemplates[0];

export function getDockTemplate(id: string) {
  return dockTemplates.find((dock) => dock.id === id);
}

export function getBuilderDockTemplate(id: string) {
  return builderDockTemplates.find((dock) => dock.id === id);
}

export function getDefaultDockTemplate() {
  return defaultDockTemplate;
}
