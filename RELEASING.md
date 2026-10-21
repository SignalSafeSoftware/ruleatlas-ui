# Release preparation

The candidate is `@ruleatlas/ui@0.1.0`, retaining the existing first-release version. npm public metadata returned HTTP 404 on 2026-10-21; verify authenticated registry scope ownership and visibility before publication.

Use Node 24 and the committed Yarn lock. Run `yarn install --frozen-lockfile`, `yarn typecheck`, `yarn lint`, `yarn test`, `yarn build`, `yarn check:package`, `yarn audit --json` and inspect `npm pack --dry-run --json`. Verify a packed installed consumer independently of the source tree. Accessibility assertions must remain active.

Publication requires explicit approval of the exact source and artifact. The existing workflow publishes on `v<version>` tags **and on manual dispatch**; never dispatch it for a nonpublishing dry run. Before tagging, confirm the workflow identity, organization npm scope access, required checks and manifest/tag equality. Tag and push the reviewed source and matching tag together as part of the approved release procedure.

Registry publication and application adoption are separate verification gates. Preserve the existing React peer contract; test both React 18 and 19 before claiming support across these major versions.
