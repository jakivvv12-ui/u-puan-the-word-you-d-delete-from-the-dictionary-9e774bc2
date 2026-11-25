// Entry for make.fun "The Word You'd Delete From the Dictionary".
// Writes exactly one word to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const WORD = "moist";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

// The entry must be exactly one real word: no whitespace at all,
// 1-77 characters, correctly spelled.
if (WORD.length < 1 || WORD.length > 77) {
  throw new Error("word must be 1-77 characters");
}
if (/\s/.test(WORD)) {
  throw new Error("word must be a single word with no whitespace");
}

mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, WORD, "utf8");

// Round-trip check: what was written is exactly the word.
const back = readFileSync(outPath, "utf8");
if (back !== WORD) {
  throw new Error("round-trip mismatch");
}
console.log(`wrote ${WORD.length} characters to ${outPath}`);
