# Eien Starter — Kōshi Foundation Integration

Status: Planning baseline (no runtime or CSS migrations in this commit).

## Purpose

Turn Eien Website Starter into a reusable, human-first Astro website foundation built with Eien design tokens and Kōshi Core for spatial composition. The starter is not a second layout framework, and Kōshi remains independently usable.

## Current baseline (inspected on `main`)

- Astro + Vue integration, optional Pinia and GSAP dependencies.
- Token source: `src/design-tokens/tokens.json`; generator: `src/convert-tokens.js`.
- Main cascade: `reset, base, compositions, components, pages, utilities`.
- Existing overlapping `.grid`, `.flex-grid`, `data-cols`, `data-span`, row spans and grid gutters in `src/styles/compositions/grid.css`.
- Useful Eien-specific patterns: `.cluster`, `.repel`, `.switcher`, `.sidebar`, `.flow` and container variants. Review individually, do not delete wholesale.
- `src/pages/index.astro` is a Johto demonstration with legacy Animancy metadata and custom grid syntax; `src/pages/playground.astro` is a larger interactive composition playground.
- README still calls Eien a "framework". Package is `studio-eien-design-system`.

## Architectural boundaries

1. **Kōshi Core** owns grid, flex grid, spans, subgrid, and its supported responsive and container query composition APIs. Use an explicitly pinned Core v0.2.0 CSS asset after verifying its integrity; do not hand-copy or rename `kos-*` APIs.
2. **Eien** owns design tokens, themes, fluid type, spacing, visual components, site shell, semantic HTML, and project-specific composition patterns.
3. **Vue/Pinia/GSAP** are opt-in for interactive experiences; static pages should not hydrate by default.
4. **Kōshi Agent Skill** is optional developer guidance, not a runtime dependency; do not bundle the entire skill with production CSS.
5. Prefer the design's requirements over preset utilities. Native CSS remains available whenever a Kōshi pattern is not appropriate.

## Migration sequence

### 01 — Freeze and verify existing behavior

- Run fresh install, token generation, Astro checks/build, and document any baseline warnings.
- Create representative screenshots/measurements at mobile, tablet, and desktop widths.
- Inventory usage of `.grid`, `.flex-grid`, `data-cols`, `data-span`, `data-row-span`, `.container`, and `.flow` in pages, layouts, scripts, and examples.
- Check navigation, theme persistence, responsive overflow, focus behavior, and links.

### 02 — Introduce Kōshi as the composition engine

- Vendor or install the pinned **Core v0.2.0 distribution** with source URL, license, and SHA-256 record; choose one maintainable update strategy. Do not alter the published artifact.
- Explicitly declare cascade placement for `kos-grid` in conjunction with existing Eien layers; verify computed rules rather than relying on accidental import precedence.
- Map relevant tokens (gutters, max width, spacing) using CSS variables at a documented integration boundary.
- Add one minimal Kōshi proof-of-integration page or specimen with native `.kos-grid` / `kos-col-span`, `.kos-flex-grid`, and responsive context, and test it across Chromium, Firefox, and WebKit.

### 03 — Replace duplicate systems deliberately

- Convert the Johto demo and interactive playground examples from the old `.grid` / `data-*` API where appropriate.
- Preserve intrinsic auto-fit behavior for layouts that don't need explicit tracks; avoid imposing 12 columns on every grid.
- Avoid defining `kos-*` aliases that misleadingly imply unsupported features.
- Identify each remaining Eien-specific pattern and its purpose. Keep `.cluster`, `.repel`, `.switcher` and any distinct sidebar/container/flow variants only where they add genuine value.
- Remove obsolete grid/flex rules only after zero callers remain, with tests validating layout parity or intentional visual changes.

### 04 — Make it a starter, not a framework

- Resolve legacy Animancy naming and update site metadata, package identity, docs, and examples.
- Separate starter home page, examples/style guide and playground so a new website does not ship a full demo by default.
- Document how to create a new site, edit tokens, use Kōshi, and add optional interactive islands.
- Keep the base CSS/JS cost explicit. Document how to omit Vue/Pinia/GSAP when not needed.

## Acceptance tests

- `npm ci`, `npm run tokens`, `npm run build` pass in a clean environment; add `astro check` and repeatable test scripts.
- Kōshi Core CSS origin and pinned checksum verified independently of the starter's own output; the file is not transformed without explicitly recording it.
- No duplicate competing Grid/Flexbox public APIs in the completed starter; all shipped example markup uses supported Kōshi attributes.
- Zero unintended horizontal overflow at widths 320, 375, 768, 1024, and 1440 pixels; representative layouts verified on all three browser engines.
- Keyboard navigation, focus-visible, theme controls, and reduced-motion behavior reviewed.
- Johto example and playground still function or their intentional replacements are clearly documented.
- No unneeded global JavaScript on ordinary static pages.
- Clear separation between Eien aesthetic/design system and Kōshi geometry.

## Next task

Implement **02 — Kōshi Core integration** on this feature branch, with the smallest meaningful proof-of-integration. Report exact source, files changed, tests performed, warnings, and screenshots before expanding migration scope.
