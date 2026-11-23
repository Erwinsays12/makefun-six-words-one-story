// Six Words, One Story — u-deranalabs-six-words-one-story-f982e410
//
// The entry is a program that writes one complete story in exactly six
// words to /output/entry.txt. The program keeps a shortlist of original
// six-word stories drafted for this competition, scores each one against
// the judge's own published brief, and writes the highest-scoring story.
//
// The judge weighs, most important first:
//   1. tells a complete story in exactly six words,
//   2. lands a turn, a surprise, or a whole life implied,
//   3. makes every word earn its place,
//   4. reads cleanly aloud, with rhythm,
//   5. leaves something unsaid that the reader fills in.
//
// Every candidate below is original, written for this competition, and is
// exactly six words and under 60 characters, so the gate (UTF-8 text of
// 1 to 60 characters, not only white space) passes for any of them. The
// program is fully deterministic: same story on every run, with no
// network, clock, randomness, or environment input.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type Candidate = {
  text: string;
  // Scores out of 10, in the judge's own order of importance.
  complete: number; // tells a complete story in exactly six words
  turn: number; // lands a turn, a surprise, or a whole life implied
  economy: number; // every word earns its place, no filler
  rhythm: number; // reads cleanly aloud, with rhythm
  unsaid: number; // leaves something unsaid for the reader
};

const CANDIDATES: Candidate[] = [
  {
    // A whole life in two beats: hope planted, then war takes the
    // harvest before the planters do. "First" does the turning — the
    // planters expected to harvest, and war got there ahead of them.
    // Who they are, what they planted, which war: all left unsaid.
    text: "They planted seeds. War harvested first.",
    complete: 10,
    turn: 10,
    economy: 10,
    rhythm: 9,
    unsaid: 10,
  },
  {
    // A letter, decades late: a missed chance, a life that went another
    // way. The turn is the delay itself — fifty years turns a delivery
    // into a ghost.
    text: "The letter arrived fifty years late.",
    complete: 10,
    turn: 9,
    economy: 10,
    rhythm: 9,
    unsaid: 10,
  },
  {
    // The piano is gone, but the quiet it leaves behind stays in the
    // house. "Stayed" turns the sale into a haunting: silence moved in
    // where the music lived.
    text: "She sold the piano. Silence stayed.",
    complete: 10,
    turn: 9,
    economy: 9,
    rhythm: 10,
    unsaid: 10,
  },
  {
    // Three beats, one arc: a proposal, laughter, then tears. The reader
    // fills in whether the tears are joy, grief, or relief.
    text: "He proposed. She laughed. Then cried.",
    complete: 10,
    turn: 9,
    economy: 9,
    rhythm: 9,
    unsaid: 9,
  },
  {
    // A long absence ends at the front door, and the house itself is the
    // one that remembers. The turn is the personification: home kept the
    // memories while he was gone.
    text: "He came home. The house remembered.",
    complete: 9,
    turn: 9,
    economy: 9,
    rhythm: 9,
    unsaid: 9,
  },
  {
    // A heritage carried in a voice, gone with it. Recipes that were
    // never written down die when the person who knew them dies.
    text: "Grandma's recipes died with her voice.",
    complete: 9,
    turn: 8,
    economy: 9,
    rhythm: 9,
    unsaid: 9,
  },
];

function totalScore(candidate: Candidate): number {
  // The judge's criteria are listed in order of importance, so the first
  // two count double: a story that is not complete, or has no turn, is
  // beaten before the rest is weighed.
  return (
    2 * candidate.complete +
    2 * candidate.turn +
    candidate.economy +
    candidate.rhythm +
    candidate.unsaid
  );
}

function pickBest(candidates: Candidate[]): Candidate {
  let best = candidates[0];
  for (const candidate of candidates.slice(1)) {
    // Strictly greater keeps the earliest candidate on a tie, so the
    // choice is stable and the ranking above is the tie-break.
    if (totalScore(candidate) > totalScore(best)) {
      best = candidate;
    }
  }
  return best;
}

function validate(text: string): void {
  const words = text.trim().split(/\s+/);
  if (words.length !== 6) {
    throw new Error(`expected exactly 6 words, got ${words.length}: ${text}`);
  }
  if (text.length < 1 || text.length > 60) {
    throw new Error(`expected 1-60 characters, got ${text.length}: ${text}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text !== text.trim() || /\s{2,}/.test(text)) {
    throw new Error(`story must not have leading, trailing or doubled spaces: ${text}`);
  }
}

function main(): void {
  // Every candidate is validated too, so the shortlist itself can never
  // hand the gate an invalid story.
  for (const candidate of CANDIDATES) {
    validate(candidate.text);
  }
  if (process.argv[2] === "--list") {
    // Audit mode: show the shortlist with scores, without writing output.
    const ranked = [...CANDIDATES].sort((a, b) => totalScore(b) - totalScore(a));
    for (const candidate of ranked) {
      console.log(`${totalScore(candidate)}  ${candidate.text}`);
    }
    return;
  }
  const story = pickBest(CANDIDATES);
  const outDir = process.argv[2] ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the file holds exactly the six-word story.
  writeFileSync(join(outDir, "entry.txt"), story.text, "utf8");
  console.log(story.text);
}

main();
