# Changelog

## 0.1.1 — 2026-11-15

- Refresh source, dependency and release-state documentation against current remote main; preserve presentational exports and host-owned data, routing and authorization.
- Fix the failing security audit with the maintained ESLint 10 release and explicit minimatch 11.0.8 / Zod 4.6.7 transitive resolutions; retain the security gate and verify lint/runtime compatibility.
- Revalidate the existing locked toolchain, real installed package and React peer compatibility before publication.

## 0.1.0 — release approved 2026-10-21

- Presentational Discovery components with interaction and accessibility tests.
- Incorporate verified upstream Vite 8.3.4 and Vitest 5.0.3 tooling changes without changing runtime exports.
- Clarify publication state and preserve historical audit evidence.
- Correct emitted ESM relative import extensions and enforce NodeNext package builds; add a real Node import gate.
- Refresh vulnerable tooling dependencies and lock entries; preserve runtime peer ranges.
- Ship the README-linked documentation explicitly and gate CI/releases on the real dependency audit and installed package checks.
