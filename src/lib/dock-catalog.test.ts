import { describe, expect, it } from "vitest";
import {
  dockTemplates,
  getDefaultDockTemplate,
  getDockTemplate,
} from "./dock-catalog";

describe("dock catalog", () => {
  it("provides a default dock with reusable metadata and builder shelves", () => {
    const dock = getDefaultDockTemplate();

    expect(dock.id).toBe("neon-command-deck");
    expect(dock.slug).toBe("neon-command-deck");
    expect(dock.fileName).toBe(".cursorrules");
    expect(dockTemplates.length).toBeGreaterThan(1);
    expect(dock.source.type).toBe("curated");
    expect(dock.taxonomy.category).toBe("Development");
    expect(dock.taxonomy.tags).toContain("prompt-engineering");
    expect(dock.headline).toContain("Build");
    expect(dock.shortDescription).toContain("modular");
    expect(dock.content.useCases.length).toBeGreaterThan(2);
    expect(dock.content.includedModules).toContain("Persona presets");
    expect(dock.content.recommendedFor).toContain("Frontend teams");
    expect(dock.content.recommendedWorkflow.length).toBeGreaterThan(2);
    expect(dock.content.safetyNotes.length).toBeGreaterThan(0);
    expect(dock.source.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(dock.source.url).toContain("github.com");
    expect(dock.stats.moduleCount).toBeGreaterThan(0);
    expect(dock.builder.personas.map((persona) => persona.id)).toEqual([
      "senior-frontend",
      "python-agent",
      "prompt-engineer",
      "code-reviewer",
    ]);
    expect(dock.builder.enhancements.map((enhancement) => enhancement.id)).toEqual([
      "clean-code",
      "debug-mode",
      "security-review",
    ]);
  });

  it("keeps default selections valid for the default dock", () => {
    const dock = getDefaultDockTemplate();
    const { builder } = dock;

    expect(
      builder.personas.some((item) => item.id === builder.defaultSelection.personaId),
    ).toBe(true);
    expect(
      builder.defaultSelection.enhancementIds.every((id) =>
        builder.enhancements.some((item) => item.id === id),
      ),
    ).toBe(true);
    expect(
      builder.outputLanguages.some(
        (item) => item.locale === builder.defaultSelection.outputLocale,
      ),
    ).toBe(true);
  });

  it("looks up dock templates by id", () => {
    expect(getDockTemplate("neon-command-deck")?.title).toBe("Neon Command Deck");
    expect(getDockTemplate("code-review-guardrails")?.title).toBe(
      "Code Review Guardrails",
    );
    expect(getDockTemplate("agent-skills")?.guide.entryCommands).toContain("/spec");
    expect(getDockTemplate("missing-dock")).toBeUndefined();
  });

  it("allows each dock to define independent builder shelves", () => {
    const reviewDock = getDockTemplate("code-review-guardrails");

    expect(reviewDock?.builder.personas.map((persona) => persona.id)).toEqual([
      "principal-reviewer",
      "release-sentinel",
    ]);
    expect(reviewDock?.builder.defaultSelection.enhancementIds).toEqual([
      "regression-map",
      "security-review",
    ]);
  });
});
