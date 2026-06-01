import { getDefaultDockTemplate, getDockTemplate } from "./dock-catalog";
import { buildPromptConfig } from "./prompt-builder";
import type { BuilderState } from "./prompt-builder";

export type ExportTargetId =
  | "universal-prompt"
  | "cursor-rules"
  | "codex-skill-pack";

export type ExportArtifact = {
  targetId: ExportTargetId;
  fileName: string;
  mimeType: string;
  content: string;
};

export function buildSkillExport(
  state: BuilderState,
  targetId: ExportTargetId,
): ExportArtifact {
  const dock = getDockTemplate(state.selectedDockId) ?? getDefaultDockTemplate();
  const promptConfig = buildPromptConfig(state);

  if (targetId === "cursor-rules") {
    return {
      targetId,
      fileName: ".cursorrules",
      mimeType: "text/plain;charset=utf-8",
      content: [
        `# Cursor Rules: ${dock.title}`,
        "",
        "Use these rules as project-level Cursor instructions.",
        "Place this file at the project root as `.cursorrules`, or paste the content into Cursor Rules.",
        "",
        promptConfig,
      ].join("\n"),
    };
  }

  if (targetId === "codex-skill-pack") {
    return {
      targetId,
      fileName: `${dock.slug}-codex-skill-pack.md`,
      mimeType: "text/markdown;charset=utf-8",
      content: [
        "---",
        `name: ${dock.slug}`,
        `description: Use when you need ${dock.shortDescription.toLowerCase()}`,
        "---",
        "",
        `# ${dock.title}`,
        "",
        dock.longDescription,
        "",
        "## When to Use",
        "",
        ...dock.content.useCases.map((item) => `- ${item}`),
        "",
        "## Workflow",
        "",
        ...dock.content.recommendedWorkflow.map((item, index) => `${index + 1}. ${item}`),
        "",
        "## Output Contract",
        "",
        "Use the following generated instruction contract as the executable core of this skill:",
        "",
        "```yaml",
        promptConfig,
        "```",
        "",
        "## Safety Notes",
        "",
        ...dock.content.safetyNotes.map((item) => `- ${item}`),
      ].join("\n"),
    };
  }

  return {
    targetId,
    fileName: `${dock.slug}-universal-prompt.md`,
    mimeType: "text/markdown;charset=utf-8",
    content: [
      `# ${dock.title}`,
      "",
      "Paste this into a system prompt, project instructions field, custom instructions field, or the first message of a new AI conversation.",
      "",
      "## Generated Instruction Config",
      "",
      "```yaml",
      promptConfig,
      "```",
    ].join("\n"),
  };
}
