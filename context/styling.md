# Styling

Use native CSS, logical properties and the indexed 7–1-inspired structure in src/styles. The eight directories are abstracts, base, themes, vendors, compositions, components, pages and utilities. main.css establishes the normal declaration layer order: reset, tokens, base, themes, kos-grid, compositions, components, pages, utilities. Reset is imported separately; Kōshi declares its own layer. Unlayered declarations and important declarations have different precedence; avoid accidental overrides.

Edit src/design-tokens/tokens.json for generated font and theme values. Run npm run tokens; do not hand-edit generated abstracts/font-sizes.css or themes/theme.css. Spacing lives in abstracts/space-sizes.css. Use semantic theme variables rather than hardcoded colors where appropriate. BaseLayout defaults to light; dark tokens exist but no theme switcher is supplied.

Use the pinned Kōshi v0.2.0 source in vendors/koshi.css; see documentation/koshi-vendor.md. Use .kos-grid for track-based layouts, .kos-flex-grid for wrapping flow, and supported kos-* attributes only. Explicit spans are not automatically responsive in every situation. Inspect container size, intrinsic content and computed styles. Keep cluster, repel, sidebar and switcher only for distinct composition needs. Do not modify the vendor file to fix a project-specific design.
