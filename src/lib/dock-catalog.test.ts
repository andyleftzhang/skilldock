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
    expect(dockTemplates.length).toBeGreaterThan(1);
    expect(dock.sourceType).toBe("cursor-rules");
    expect(dock.tags).toContain("prompt-engineering");
    expect(dock.promptMeta.sourceUrl).toContain("github.com");
    expect(dock.personas.map((persona) => persona.id)).toEqual([
      "senior-frontend",
      "python-agent",
      "prompt-engineer",
      "code-reviewer",
    ]);
    expect(dock.enhancements.map((enhancement) => enhancement.id)).toEqual([
      "clean-code",
      "debug-mode",
      "security-review",
    ]);
  });

  it("keeps default selections valid for the default dock", () => {
    const dock = getDefaultDockTemplate();

    expect(dock.personas.some((item) => item.id === dock.defaultSelection.personaId)).toBe(
      true,
    );
    expect(
      dock.defaultSelection.enhancementIds.every((id) =>
        dock.enhancements.some((item) => item.id === id),
      ),
    ).toBe(true);
    expect(
      dock.outputLanguages.some(
        (item) => item.locale === dock.defaultSelection.outputLocale,
      ),
    ).toBe(true);
  });

  it("looks up dock templates by id", () => {
    expect(getDockTemplate("neon-command-deck")).toBe(dockTemplates[0]);
    expect(getDockTemplate("code-review-guardrails")?.title).toBe(
      "Code Review Guardrails",
    );
    expect(getDockTemplate("missing-dock")).toBeUndefined();
  });

  it("allows each dock to define independent builder shelves", () => {
    const reviewDock = getDockTemplate("code-review-guardrails");

    expect(reviewDock?.personas.map((persona) => persona.id)).toEqual([
      "principal-reviewer",
      "release-sentinel",
    ]);
    expect(reviewDock?.defaultSelection.enhancementIds).toEqual([
      "regression-map",
      "security-review",
    ]);
  });
});
