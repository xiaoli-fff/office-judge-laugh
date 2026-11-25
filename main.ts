// Make the AI Judge Laugh — office-life one-liner.
// Deterministic: one fixed string, no network, no randomness.
// Writes the entry to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Gate: UTF-8 text, 1-200 characters (counted by code point), not only whitespace,
// single line, no control characters. Fails loudly instead of writing a partial file.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My performance review said I need to be more visible, so I moved my desk into the elevator.";

function fail(message: string): never {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

const chars = [...ENTRY]; // code-point count
if (ENTRY.length === 0 || ENTRY.trim().length === 0) {
  fail("entry is empty or only whitespace");
}
if (chars.length > 200) {
  fail(`entry is ${chars.length} characters, over the 200-character limit`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  fail("entry must be a single line");
}
for (const ch of ENTRY) {
  if (ch.charCodeAt(0) < 0x20 && ch !== "\t") {
    fail(`entry contains a control character U+${ch.charCodeAt(0).toString(16).padStart(4, "0")}`);
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, ENTRY + "\n", "utf8");
console.log(`Wrote ${chars.length} characters to ${outPath}`);
console.log(ENTRY);
