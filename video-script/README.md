# video-script/

What Ahmad plans to **say**. This is the top of the authority order — when a
script and the code disagree, the script wins. See `PROJECT_STRUCTURE.md`.

| folder | what it is |
| --- | --- |
| **`video-1/`** | **The film.** Thirteen numbered sections plus `READ_ALOUD.md`. |
| `video-2-gpt/` | An alternate narration written by ChatGPT. A proposal, not scheduled. |

Only `video-1/` is read by the tooling. `npm run board`, `check:chain`,
`check:board`, `check:strategy`, `timing` and `readthrough` all read
`video-script/video-1/` and ignore everything else in here.
