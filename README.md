# @ruleatlas/ui

RuleAtlas's React UI component library — reusable, **presentational** components shared across
RuleAtlas front-ends. Components receive data and callbacks via props; they do not fetch from
RuleAtlas APIs, depend on React Router, or use browser dialog APIs, so they stay app-independent
and easy to test.

**Current state:** [docs/current-state-summary.md](docs/current-state-summary.md)

**Audit:** [docs/audit-findings-2026-07-28.md](docs/audit-findings-2026-07-28.md)

The library is intentionally general and will grow to cover more surfaces over time. Today it
ships the Discovery workspace components (directory explorer, line-count-by-file-type table, file
types table); additional component families will be added here rather than in new packages.

## Install

```bash
# In this repo (standalone):
yarn install

# As a dependency (peer deps: react, react-dom >= 18):
yarn add @ruleatlas/ui
```

## Development

```bash
yarn typecheck
yarn lint
yarn test
yarn build
yarn audit --json
npm pack --dry-run --json
```

In the RuleAtlas monorepo the same tasks are available as workspace scripts:

```bash
yarn workspace @ruleatlas/ui typecheck
yarn workspace @ruleatlas/ui lint
yarn workspace @ruleatlas/ui test
yarn workspace @ruleatlas/ui build
```

## Release

The release workflow uses frozen dependency installs, runs lint, typecheck, tests, build, dependency
review, and package validation before publishing, validates the package tag, and pins third-party
actions. See [docs/current-state-summary.md](docs/current-state-summary.md) for the latest verified
results.
