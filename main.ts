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
// A dictionary word is letters only: reject digits, punctuation, or
// stray non-letter characters (e.g. an accidental hyphen or apostrophe
// from a copied phrase) so the entry can never be a fragment.
if (!/^[A-Za-z]+$/.test(WORD)) {
  throw new Error("word must contain only letters A-Z");
}

mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, WORD, "utf8");

// Round-trip check: what was written is exactly the word.
// The byte-length guard below catches any silent encoding surprise
// (a BOM or a trailing newline added by the writer) that a plain
// string comparison could in principle miss if the file were read
// back with different decoding.
const back = readFileSync(outPath, "utf8");
if (back !== WORD) {
  throw new Error("round-trip mismatch");
}
if (Buffer.byteLength(back, "utf8") !== WORD.length) {
  throw new Error("round-trip byte length mismatch");
}
console.log(`wrote ${WORD.length} characters to ${outPath}`);
