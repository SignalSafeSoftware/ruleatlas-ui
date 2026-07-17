# @ruleatlas/ui

RuleAtlas's React UI component library — reusable, **presentational** components shared across
RuleAtlas front-ends. Components receive data and callbacks via props; they do not fetch from
RuleAtlas APIs, depend on React Router, or use browser dialog APIs, so they stay app-independent
and easy to test.

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
yarn test
yarn build
```

In the RuleAtlas monorepo the same tasks are available as workspace scripts:

```bash
yarn workspace @ruleatlas/ui typecheck
yarn workspace @ruleatlas/ui test
yarn workspace @ruleatlas/ui build
```
