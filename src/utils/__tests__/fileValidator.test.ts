import { describe, it, expect } from "vitest";
import { validateFile } from "../fileValidator";

describe("FileGuard file validation", () => {
  it("accepts a valid PDF file", () => {
    const file = new File(["test content"], "document.pdf", {
      type: "application/pdf",
    });

    expect(validateFile(file).valid).toBe(true);
  });

  it("rejects an MP3 file", () => {
    const file = new File(["audio"], "music.mp3", {
      type: "audio/mpeg",
    });

    expect(validateFile(file).valid).toBe(false);
  });

  it("rejects an unsupported file type", () => {
    const file = new File(["test"], "script.exe", {
      type: "application/octet-stream",
    });

    expect(validateFile(file).valid).toBe(false);
  });

  it("rejects empty files", () => {
    const file = new File([], "empty.pdf", {
      type: "application/pdf",
    });

    expect(validateFile(file).valid).toBe(false);
  });

  it("rejects files larger than 10 MB", () => {
    const file = new File(
      [new Uint8Array(11 * 1024 * 1024)],
      "large.pdf",
      { type: "application/pdf" }
    );

    expect(validateFile(file).valid).toBe(false);
  });
});