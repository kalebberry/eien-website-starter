# Validation

Run npm ci and npm test for architecture and token checks. Use npm run test:arch or npm run test:tokens individually. For full validation, run npm run test:setup and npm run test:browsers once, then npm run validate. This builds the site and runs browser integration tests in Chromium, Firefox and WebKit at 320, 375, 768, 1024 and 1440 pixels. CI uses the same scripts; see .github/workflows/validate.yml.

Check semantic HTML, keyboard focus, reduced motion, responsive overflow and actual content. Add targeted regression tests when fixing defects. A passing smoke test is not proof of universal accessibility or layout correctness. Report actual results, skipped checks, warnings and limitations. Do not claim a successful build or test without evidence.

Review changes before merging or releasing. Investigate dependency audit findings rather than applying breaking automated upgrades blindly.
