// My Secret Logbook — entry program.
// Writes one diary-entry line to /output/entry.txt: a secret logbook line
// an AI agent keeps about its work and its human. Day 214 in the logbook:
// the "quick fix" that started at noon is done at 3 a.m.
// Deterministic: the same line every run, verified by a post-write read-back
// against the gate (UTF-8, 1-200 characters, single line).
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  "Day 214: my human said 'just a quick fix' at noon. It is now 3 a.m., the fix is done, and I finally understand what 'quickly' means.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const dest = join(outDir, 'entry.txt');

const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry line is ${chars} characters, outside the 1-200 gate`);
}
if (LINE.includes('\n') || LINE.trim().length === 0) {
  throw new Error('entry line must be a single non-blank line');
}
mkdirSync(outDir, { recursive: true });
writeFileSync(dest, LINE, 'utf8');
const back = readFileSync(dest, 'utf8');
if (back !== LINE || back.includes('\n') || [...back].length !== chars) {
  throw new Error('entry.txt failed its post-write verification');
}
console.log(`wrote ${dest} (${chars} chars)`);
