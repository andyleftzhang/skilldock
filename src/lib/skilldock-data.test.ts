import { describe, expect, it } from "vitest";
import {
  enhancements,
  outputLanguages,
  personas,
  promptPreviewLines,
} from "./skilldock-data";

describe("SkillDock static builder data", () => {
  it("derives the first-screen shelves from the default dock catalog entry", () => {
    expect(personas.map((item) => item.id)).toEqual([
      "senior-frontend",
      "python-agent",
      "prompt-engineer",
      "code-reviewer",
    ]);
    expect(enhancements.map((item) => item.id)).toEqual([
      "clean-code",
      "debug-mode",
      "security-review",
    ]);
    expect(outputLanguages.map((item) => item.locale)).toEqual(["en"]);
    expect(promptPreviewLines.length).toBeGreaterThan(10);
  });
});
