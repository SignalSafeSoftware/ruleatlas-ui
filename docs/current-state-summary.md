# RuleAtlas UI current-state summary

**Authority date:** 2026-07-28  
**Audit:** [audit-findings-2026-07-28.md](audit-findings-2026-07-28.md)

## Purpose and boundary

`@ruleatlas/ui` is the standalone presentational React component library shared by RuleAtlas
frontends. Components receive data and callbacks through props. The package does not fetch
RuleAtlas APIs, depend on React Router, or invoke browser dialog APIs.

The current release contains Discovery workspace primitives, including the directory explorer,
line-count-by-file-type metrics, and file-type tables. Application state, routing, authorization,
and API orchestration stay in the RuleAtlas monorepo.

## Quality and accessibility

The 2026-07-28 audit closed every repository checklist item:

| Gate | Observed result |
| --- | --- |
| ESLint | Pass |
| TypeScript | Pass |
| Tests | 9 passing interaction/component tests |
| Accessibility | `jest-axe` assertions included |
| Build | Pass |
| Dependency audit | No advisories |
| Package dry-run | 60 files; approximately 25.1 kB |
| CI / release | Frozen installs, pre-publish validation, pinned actions, package-tag validation |

## Development

```bash
yarn install --immutable
yarn lint
yarn typecheck
yarn test
yarn build
yarn audit --json
npm pack --dry-run --json
```

## Release state

The repository is release-ready at the library boundary. The RuleAtlas monorepo currently consumes
the package from `main`; the checkout observed during validation was
`5d6004b35e962e755894506d376e8faf4efa6ed6`. Publish and application production-readiness decisions
remain separate from this package-level audit.
