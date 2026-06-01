import { describe, expect, it } from "vitest";
import { buildSkillExport } from "./skill-exporter";

const state = {
  selectedDockId: "neon-command-deck",
  selectedPersonaId: "python-agent",
  selectedEnhancementIds: ["debug-mode", "security-review"],
  selectedOutputLocale: "en" as const,
};

describe("skill exporter", () => {
  it("exports a universal prompt for generic AI instruction fields", () => {
    const artifact = buildSkillExport(state, "universal-prompt");

    expect(artifact.fileName).toBe("neon-command-deck-universal-prompt.md");
    expect(artifact.content).toContain("# Neon Command Deck");
    expect(artifact.content).toContain("Paste this into a system prompt");
    expect(artifact.content).toContain("role: Python Agent");
    expect(artifact.content).toContain("Final instruction: Answer in English.");
  });

  it("exports Cursor rules as a .cursorrules file", () => {
    const artifact = buildSkillExport(state, "cursor-rules");

    expect(artifact.fileName).toBe(".cursorrules");
    expect(artifact.content).toContain("# Cursor Rules: Neon Command Deck");
    expect(artifact.content).toContain("Use these rules as project-level Cursor instructions.");
    expect(artifact.content).toContain("Security Review");
  });

  it("exports a Codex-compatible skill pack as a single markdown bundle", () => {
    const artifact = buildSkillExport(state, "codex-skill-pack");

    expect(artifact.fileName).toBe("neon-command-deck-codex-skill-pack.md");
    expect(artifact.content).toContain("---");
    expect(artifact.content).toContain("name: neon-command-deck");
    expect(artifact.content).toContain("description:");
    expect(artifact.content).toContain("## When to Use");
    expect(artifact.content).toContain("## Workflow");
    expect(artifact.content).toContain("## Output Contract");
  });
});
