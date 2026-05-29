import { describe, expect, it } from "vitest";
import {
  buildPromptConfig,
  createInitialBuilderState,
  toggleEnhancement,
} from "./prompt-builder";

describe("prompt builder", () => {
  it("builds a config from selected persona, enhancements, and output language", () => {
    const state = {
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
      selectedPersonaId: "senior-frontend",
      selectedEnhancementIds: ["clean-code", "debug-mode"],
      selectedOutputLocale: "ja",
    });
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
