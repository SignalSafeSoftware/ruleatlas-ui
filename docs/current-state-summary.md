# RuleAtlas UI current-state summary

## Coordinated release preparation — 2026-10-21

The candidate retains source version 0.1.0 for first publication. Its source incorporates upstream dependency and Vitest 5 accessibility-test updates at ca25d64662e1e56118a430e9ce47d39d5a645786 and preserves the local planning notes below. Historical July results are not current release evidence. Current verification is recorded separately in the release coordination packet; publication requires user approval.


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

## DeliveryPlus planning note — 2026-10-15

Local source versions: `@ruleatlas/ui` 0.1.0. These values come from package manifests/version authorities and do not certify registry publication or current production deployments. The July audit and feature details above retain their original evidence date.

No change to these RuleAtlas package contracts is required by DeliveryPlus customer subdomains. Keep their existing RuleAtlas boundaries and domain behavior; add no DeliveryPlus Company models, tenant database selection or authentication dependencies. Application-specific routing/security stays in its host. See the DeliveryPlus feature plan (`DeliveryPlus/docs/features/customer-subdomains.md` in the host repository) and ecosystem summary (`DeliveryPlus/docs/ai/ecosystem-package-summary.md` in the host repository). This refresh does not rerun the July checks or certify readiness for a new release.
