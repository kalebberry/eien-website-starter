# Validation

Run npm ci, npm run test:architecture, npm run build, and node --test tests/tokens.test.mjs. CI also installs Playwright and runs browser integration tests in Chromium, Firefox and WebKit at 320, 375, 768, 1024 and 1440 pixels. See .github/workflows/validate.yml for the exact commands.

Check semantic HTML, keyboard focus, reduced motion, responsive overflow and actual content. Add targeted regression tests when fixing defects. A passing smoke test is not proof of universal accessibility or layout correctness. Report actual results, skipped checks, warnings and limitations. Do not claim a successful build or test without evidence.

Review changes before merging or releasing. Investigate dependency audit findings rather than applying breaking automated upgrades blindly.
