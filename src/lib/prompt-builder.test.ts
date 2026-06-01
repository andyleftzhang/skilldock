import { describe, expect, it } from "vitest";
import {
  buildPromptConfig,
  createInitialBuilderState,
  toggleEnhancement,
} from "./prompt-builder";

describe("prompt builder", () => {
  it("builds a config from selected persona, enhancements, and output language", () => {
    const state = {
      selectedDockId: "neon-command-deck",
      selectedPersonaId: "python-agent",
      selectedEnhancementIds: ["debug-mode", "security-review"],
      selectedOutputLocale: "es" as const,
    };

    expect(buildPromptConfig(state)).toBe(
      [
        "dock: skilldock/neon-command-deck",
        "persona:",
        "  role: Python Agent",
        "  mindset: automation-first, reliable, data-aware",
        "enhancements:",
        "  - Debug Mode: Explain assumptions, inspect failures, verify fixes.",
        "  - Security Review: Call out risky data flows and unsafe defaults.",
        "workflow:",
        "  inspect_context: true",
        "  explain_tradeoffs: concise",
        "  verify_before_handoff: true",
        "output:",
        "  format: implementation-ready guidance",
        "  language: Spanish",
        "",
        "Final instruction: Answer in Spanish.",
      ].join("\n"),
    );
  });

  it("creates the default live preview state", () => {
    expect(createInitialBuilderState("ja")).toEqual({
      selectedDockId: "neon-command-deck",
      selectedPersonaId: "senior-frontend",
      selectedEnhancementIds: ["clean-code", "debug-mode"],
      selectedOutputLocale: "ja",
    });
  });

  it("creates initial state from a selected dock id", () => {
    expect(createInitialBuilderState("en", "code-review-guardrails")).toEqual({
      selectedDockId: "code-review-guardrails",
      selectedPersonaId: "principal-reviewer",
      selectedEnhancementIds: ["regression-map", "security-review"],
      selectedOutputLocale: "en",
    });
  });

  it("falls back to the default dock when an unknown dock is selected", () => {
    const state = {
      selectedDockId: "unknown-dock",
      selectedPersonaId: "senior-frontend",
      selectedEnhancementIds: ["clean-code"],
      selectedOutputLocale: "en" as const,
    };

    expect(buildPromptConfig(state)).toContain("dock: skilldock/neon-command-deck");
  });

  it("builds config from a non-default dock", () => {
    const state = {
      selectedDockId: "code-review-guardrails",
      selectedPersonaId: "release-sentinel",
      selectedEnhancementIds: ["handoff-check"],
      selectedOutputLocale: "en" as const,
    };

    expect(buildPromptConfig(state)).toContain("dock: skilldock/code-review-guardrails");
    expect(buildPromptConfig(state)).toContain("role: Release Readiness Reviewer");
    expect(buildPromptConfig(state)).toContain(
      "Handoff Check: Summarize open risks, verification evidence, and follow-up work.",
    );
  });

  it("toggles enhancements without mutating the current selection", () => {
    const current = ["clean-code", "debug-mode"];

    expect(toggleEnhancement(current, "debug-mode")).toEqual(["clean-code"]);
    expect(toggleEnhancement(current, "security-review")).toEqual([
      "clean-code",
      "debug-mode",
      "security-review",
    ]);
    expect(current).toEqual(["clean-code", "debug-mode"]);
  });
});
