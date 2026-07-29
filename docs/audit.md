# RuleAtlas UI Package Audit Guide

Latest repository audit: [2026-07-28 findings](audit-findings-2026-07-28.md).

This document is the authoritative audit procedure for the standalone
`@ruleatlas/ui` repository. It is derived from the monorepo `docs/audit.md`,
with scope limited to the reusable React component package and its release
surface.

## Audit rules

1. Audit tracked source, tests, metadata, documentation, CI, and release
   configuration. Exclude `node_modules`, local caches, and generated `dist`
   output unless the output is intentionally tracked.
2. Record exact commands and outcomes. Skipped or unavailable validation is
   not a pass.
3. Separate confirmed defects from risks, observations, and intentional design
   choices.
4. Do not modify runtime code during the initial audit. Record findings before
   preparing repairs.
5. Every finding must include severity, evidence, impact, and remediation.

## Required audit areas

### Public package surface

- Review `src/index.ts` and every re-export for missing, accidental, or
  unstable public APIs.
- Confirm `package.json` entry points, types, files, peer dependencies, and
  release artifacts match the intended consumer contract.
- Check that components remain product-neutral and do not import monorepo-only
  modules or styles.

### React and TypeScript correctness

- Review controlled/uncontrolled behavior, prop forwarding, refs, keys,
  effects, memoization, stale closures, async cleanup, error states, and null
  handling.
- Check type safety, unsafe assertions, `any`, suppression comments, and
  divergence between runtime defaults and declared types.

### Accessibility and interaction

- Check semantic elements, labels, names, focus order, keyboard operation,
  focus restoration, dialog behavior, live-region usage, contrast assumptions,
  loading states, and disabled states.
- Treat accessibility regressions as correctness defects.

### Security and privacy

- Inspect HTML rendering, URL handling, untrusted text, event leakage,
  secret-like literals, dependency risk, and workflow supply-chain risk.
- Verify no component silently logs or persists consumer data.

### Duplication, dead code, and maintainability

- Search for duplicate components/styles, stale exports, unreachable branches,
  unused props, magic strings, TODO/FIXME markers, suppression comments, and
  committed generated files.
- Compare README examples with the actual exported API.

### Tests and release readiness

- Run type checking, unit tests, and the production build exactly as CI does.
- Inspect coverage of public exports, interaction states, accessibility, and
  failure paths.
- Verify the built package contains only intended files and declarations.

## Required commands

From the repository root:

```bash
git status --short --branch
yarn install --frozen-lockfile
yarn typecheck
yarn test
yarn build
```

Also run focused static searches over tracked source and configuration for
unfinished work, TypeScript suppressions, unsafe HTML, broad lint escapes,
secret-like literals, and export drift.

## Finding format

```text
RA-UI-<severity>-<number> — Short title
Severity: P0 | P1 | P2 | P3
Status: Open | Accepted | Fixed | Verified
Evidence: file:line and/or exact command output
Impact: user, accessibility, security, correctness, or maintainability impact
Remediation: bounded proposed change and validation
```

P0 blocks all release activity. P1 blocks production readiness. P2 should be
scheduled. P3 is low-risk cleanup.

## Completion checklist

- [x] Scope and tracked inventory recorded
- [x] Public exports and package metadata reviewed
- [x] Component behavior and TypeScript safety reviewed
- [x] Accessibility and interaction review completed
- [x] Security and dependency review recorded
- [x] Type-check result recorded
- [x] Test result recorded
- [x] Build and artifact result recorded
- [x] Documentation drift reviewed
- [x] Findings prioritized with evidence
- [x] Remediation checklist created
- [x] Release-readiness verdict stated

The latest dated report is the audit evidence. The guide itself is not proof
that an audit passed.
