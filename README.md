# Eien Website Starter

A minimal Astro foundation for handcrafted websites. Eien provides design tokens, themes, reusable components and native CSS architecture; Kōshi provides spatial composition.

## Getting started

```sh
npm ci
npm run dev
npm run build
```

Edit `src/pages/index.astro` to start your site. No public demo or playground is included.

## Styles

The 7–1-inspired architecture uses eight directories and one entry point: abstracts, base, themes, vendors, compositions, components, pages and utilities. Each has an index.css; main.css declares cascade order. Reset is imported separately into its own layer. Edit color/type tokens in `src/design-tokens/tokens.json`; spacing lives in `src/styles/abstracts/space-sizes.css`. Generated font and theme CSS is refreshed on dev/build. Kōshi Core v0.2.0 is vendored as the LF source from its release tag; see documentation/koshi-vendor.md. Use native Kōshi APIs, not legacy data-cols/data-span.

Vue, Pinia and GSAP remain installed for optional use in this initial migration; the starter page does not hydrate any islands. The Kōshi Agent Skill is optional development guidance.

## Verification

Run `npm test` for architecture and token checks, or `npm run test:arch` and `npm run test:tokens` individually.

For full validation, install the isolated browser tooling once:

```sh
npm run test:setup
npm run test:browsers
npm run validate
```

`npm run validate` runs the fast tests, builds the site, and runs browser tests. Use `npm run test:e2e` to test an existing production build. Linux CI installs browser system dependencies with `npm run test:browsers -- --with-deps`. Review dependency security separately with `npm audit`.
