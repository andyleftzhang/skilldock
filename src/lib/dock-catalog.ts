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
    entryCommands?: string[];
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
    id: "openai-skills",
    dockMode: "guide",
    projectType: "agent-skill-library",
    slug: "openai-skills",
    title: "OpenAI Skills",
    fileName: "skills/*",
    headline: "A Codex skills catalog for reusable agent capabilities.",
    shortDescription:
      "A concise guide to OpenAI's skills catalog for installing curated and experimental Codex skills.",
    longDescription:
      "OpenAI Skills catalogs folders of instructions, scripts, and resources that Codex can discover and use for repeatable tasks.",
    source: {
      type: "github",
      repo: "openai/skills",
      url: "https://github.com/openai/skills",
      author: "OpenAI",
      license: "Per-skill license",
      lastUpdated: "2026-06-01",
    },
    stats: {
      popularityLabel: "Codex catalog",
      moduleCount: 20,
    },
    taxonomy: {
      category: "Tools",
      occupation: "Codex User",
      tags: ["openai", "codex", "skills", "catalog", "agent-skills"],
      difficulty: "starter",
    },
    content: {
      useCases: [
        "Find reusable skills that are designed for Codex workflows.",
        "Install curated or experimental skills without manually copying prompt text.",
        "Learn the folder-based Agent Skills pattern from an official catalog.",
      ],
      includedModules: [
        "System skills",
        "Curated skills",
        "Experimental skills",
        "Skill installation examples",
      ],
      recommendedFor: [
        "Codex users",
        "Teams standardizing repeatable agent workflows",
        "People learning how OpenAI-style skills are packaged",
      ],
      recommendedWorkflow: [
        "Start with a curated skill that matches one recurring task.",
        "Install through Codex skill tooling instead of copying files by hand.",
        "Restart Codex after installing new skills.",
      ],
      safetyNotes: [
        "Review experimental skills before relying on them for production work.",
        "Check individual skill licenses and scripts before redistribution.",
      ],
    },
    guide: {
      supportedTools: ["Codex"],
      entryCommands: ["$skill-installer", "$skill-installer gh-address-comments"],
      installGuide: [
        "Use the skill installer inside Codex for curated or experimental skills.",
        "Install by skill name, folder, or GitHub directory URL.",
        "Restart Codex after installation so the new skill is discoverable.",
      ],
      firstRunExamples: [
        "$skill-installer gh-address-comments",
        "$skill-installer install https://github.com/openai/skills/tree/main/skills/.experimental/create-plan",
      ],
      bestPractices: [
        "It is the most direct source for Codex-native skill packaging patterns.",
        "It separates system, curated, and experimental skills so users can choose their risk level.",
        "It teaches users to install skills through tooling instead of pasting prompts.",
      ],
      commonMistakes: [
        "Installing experimental skills without reading the skill folder first.",
        "Forgetting to restart Codex after installation.",
      ],
      whenNotToUse: [
        "Avoid it if your primary tool is not Codex.",
        "Do not assume every experimental skill is production-ready.",
      ],
    },
  },
  {
    id: "google-skills",
    dockMode: "guide",
    projectType: "agent-skill-library",
    slug: "google-skills",
    title: "Google Skills",
    fileName: "skills/cloud/*",
    headline: "Agent Skills for Google products, technologies, and Cloud workflows.",
    shortDescription:
      "A curated guide to Google's Agent Skills for Google Cloud, Firebase, BigQuery, Cloud Run, and well-architected reviews.",
    longDescription:
      "Google Skills packages Agent Skills for Google products and technologies, including installable Google Cloud basics, recipes, and well-architected framework guidance.",
    source: {
      type: "github",
      repo: "google/skills",
      url: "https://github.com/google/skills",
      author: "Google",
      license: "Apache-2.0",
      lastUpdated: "2026-06-01",
    },
    stats: {
      popularityLabel: "Google Cloud skills",
      moduleCount: 18,
    },
    taxonomy: {
      category: "Tools",
      occupation: "Cloud Developer",
      tags: ["google", "google-cloud", "firebase", "bigquery", "agent-skills"],
      difficulty: "advanced",
    },
    content: {
      useCases: [
        "Give an AI agent Google Cloud and Google product context for common engineering tasks.",
        "Use focused skills for Cloud Run, BigQuery, Firebase, AlloyDB, Cloud SQL, and GKE basics.",
        "Apply Google Cloud well-architected review perspectives to architecture and operations work.",
      ],
      includedModules: [
        "Google Cloud basics",
        "Firebase and data platform skills",
        "Agent Platform API skills",
        "Well-Architected Framework review skills",
      ],
      recommendedFor: [
        "Google Cloud users",
        "Cloud engineers",
        "Teams building on Firebase, BigQuery, Cloud Run, or GKE",
      ],
      recommendedWorkflow: [
        "Install only the Google skill that matches the service you are using.",
        "Start with a basics skill before asking for architecture review.",
        "Use the well-architected skills when reviewing production systems.",
      ],
      safetyNotes: [
        "Do not paste cloud credentials or secrets into prompts.",
        "Validate generated cloud commands against your own project, billing, and IAM policies.",
      ],
    },
    guide: {
      supportedTools: ["Agent Skills compatible tools", "Codex", "Claude Code"],
      entryCommands: ["npx skills add google/skills"],
      installGuide: [
        "Run `npx skills add google/skills`.",
        "Select only the specific Google skills you need.",
        "Test with a non-production project before applying advice to real infrastructure.",
      ],
      firstRunExamples: [
        "Use the Cloud Run Basics skill to review this service deployment.",
        "Use the BigQuery Basics skill to explain this query and cost risk.",
        "Use the Security well-architected skill to review this Google Cloud design.",
      ],
      bestPractices: [
        "It is best for users already working with Google Cloud or Google product stacks.",
        "The install command lets users select specific skills instead of cloning everything.",
        "The well-architected skills make it useful beyond simple how-to prompts.",
      ],
      commonMistakes: [
        "Installing broad cloud skills without knowing which Google service is involved.",
        "Applying generated infrastructure advice without checking IAM and billing impact.",
      ],
      whenNotToUse: [
        "Avoid it if your stack is not Google-based.",
        "Do not use it as a substitute for official cloud security review.",
      ],
    },
  },
  {
    id: "agent-skills",
    dockMode: "guide",
    projectType: "agent-skill-library",
    slug: "agent-skills",
    title: "Agent Skills",
    fileName: "commands + skills",
    headline: "Production-grade engineering workflows for AI coding agents.",
    shortDescription:
      "A curated guide to Addy Osmani's engineering skill library for spec, plan, build, test, review, simplify, and ship workflows.",
    longDescription:
      "Agent Skills turns senior engineering practices into reusable commands and skills for AI coding agents, with strong emphasis on quality gates, verification, and production readiness.",
    source: {
      type: "github",
      repo: "addyosmani/agent-skills",
      url: "https://github.com/addyosmani/agent-skills",
      author: "Addy Osmani / contributors",
      license: "Source repository license",
      lastUpdated: "2026-06-01",
    },
    stats: {
      popularityLabel: "Engineering lifecycle",
      moduleCount: 23,
    },
    taxonomy: {
      category: "Development",
      occupation: "Software Engineer",
      tags: ["coding-agent", "engineering", "commands", "quality", "production"],
      difficulty: "advanced",
    },
    content: {
      useCases: [
        "Give an AI coding agent a clearer engineering lifecycle instead of vague coding prompts.",
        "Move from specification to planning, building, testing, review, simplification, and shipping.",
        "Add quality gates and verification habits to agent-assisted development.",
      ],
      includedModules: [
        "Slash command workflows",
        "Engineering lifecycle skills",
        "Testing and review gates",
        "Code simplification and shipping workflows",
      ],
      recommendedFor: [
        "AI coding agent users",
        "Senior engineers",
        "Technical leads",
        "Builders who care about production-grade workflow",
      ],
      recommendedWorkflow: [
        "Start with /spec before asking the agent to build.",
        "Use /plan to decompose the work into concrete steps.",
        "Use /build and /test for implementation and verification.",
        "Use /review and /ship before treating the work as release-ready.",
      ],
      safetyNotes: [
        "Treat command output as engineering assistance, not final production approval.",
        "Keep human review in the loop for security, data, and release decisions.",
      ],
    },
    guide: {
      supportedTools: [
        "Claude Code",
        "Cursor",
        "Gemini CLI",
        "Windsurf",
        "OpenCode",
        "GitHub Copilot",
        "Kiro",
        "Codex",
      ],
      entryCommands: [
        "/spec",
        "/plan",
        "/build",
        "/test",
        "/review",
        "/code-simplify",
        "/ship",
      ],
      installGuide: [
        "Choose the installation instructions for your coding agent in the source README.",
        "Install the commands and skills for the tool you actually use.",
        "Restart or reload your agent session before trying a workflow command.",
      ],
      firstRunExamples: [
        "/spec Define a checkout flow for a small SaaS app.",
        "/plan Break this feature into implementation tasks.",
        "/review Review this branch for production risks.",
      ],
      bestPractices: [
        "It covers the full engineering lifecycle, not just isolated prompt snippets.",
        "It gives agents concrete entry commands, which is easier for users to try than browsing 23 skills.",
        "It emphasizes testing, review, simplification, and shipping rather than pure code generation.",
      ],
      commonMistakes: [
        "Jumping straight to /build before clarifying the specification.",
        "Treating one command as a replacement for human engineering judgment.",
      ],
      whenNotToUse: [
        "Avoid it for tiny edits where a full engineering lifecycle is unnecessary.",
        "Do not use it as the final authority for production releases.",
      ],
    },
  },
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
