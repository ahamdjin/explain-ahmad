# GitHub automation

`workflows/ci.yml` is the production verification workflow. It runs on pushes and pull requests and independently executes the repository’s story/static checks, production build, Chromium route smoke test and visual-overlap gate.

See `../docs/QA.md` for what each gate means and what remains a human visual/story review responsibility.
