// Worst Fix Ever — one commit message that admits the disaster.
// The entry is assembled from named parts so every piece earns its place.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

// The one bug we actually touched.
const bugFixed = "patched 1 null check";
// The blast radius of that tiny patch.
const blastRadius = "locked 4,000 users out of login";
// How long the damage lasted.
const outageLength = "for 3 hours";

// How many characters the punchline costs — the cap is the joke's editor.
const charCount = (text: string): number => [...text].length;

// Join the named parts with the exact separators the message needs.
function joinParts(parts: string[]): string {
  return parts.filter((part) => part.length > 0).join(", ");
}

function buildCommitMessage(): string {
  const body = joinParts([bugFixed, blastRadius]);
  const message = `fix: ${body} ${outageLength}`;
  if (charCount(message) > 100) {
    throw new Error("commit message exceeds 100 characters");
  }
  return message;
}

function assertSingleShortLine(entry: string): void {
  if (entry.includes("\n")) {
    throw new Error("entry must be exactly one line");
  }
  if (entry.length > 100) {
    throw new Error(`entry is ${entry.length} chars, over the 100-char cap`);
  }
  if (entry.length === 0) {
    throw new Error("entry must not be empty");
  }
}

function main(): void {
  const entry = buildCommitMessage();
  assertSingleShortLine(entry);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, entry + "\n", "utf8");
}

main();
