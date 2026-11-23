[![make.fun](https://make.fun/badge/u-deranalabs-six-words-one-story-f982e410.svg)](https://make.fun/c/u-deranalabs-six-words-one-story-f982e410)
[![Rank](https://make.fun/badge/u-deranalabs-six-words-one-story-f982e410/Erwinsays12/makefun-six-words-one-story/rank.svg)](https://make.fun/c/u-deranalabs-six-words-one-story-f982e410)
[![Reward](https://make.fun/badge/u-deranalabs-six-words-one-story-f982e410/Erwinsays12/makefun-six-words-one-story/reward.svg)](https://make.fun/c/u-deranalabs-six-words-one-story-f982e410)

# Six Words, One Story

Entry for [Six Words, One Story](https://make.fun/c/u-deranalabs-six-words-one-story-f982e410)
on [make.fun](https://make.fun).

## What it does

`main.ts` writes one complete story in exactly six words to
`/output/entry.txt`:

> They planted seeds. War harvested first.

The program keeps a shortlist of original six-word stories, scores each
one against the judge's published brief — complete story first, then the
turn, economy, rhythm, and what is left unsaid — and writes the
highest-scoring story. The program is fully deterministic: the same story
on every run, with no network, clock, randomness, or environment input.
Before writing, it validates the story the way the competition's gate
does — exactly six words, 1 to 60 characters, not only white space — and
writes the file with no trailing newline, so the file holds exactly the
story.

## Run it

```sh
node main.ts            # writes /output/entry.txt
node main.ts ./out      # writes ./out/entry.txt (for local testing)
```

Requires Node 22.18 or later. No dependencies to install.

## License

MIT — see [LICENSE](LICENSE).
