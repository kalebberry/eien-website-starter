# Architecture

Astro renders pages from src/pages; src/layouts/BaseLayout.astro supplies the document shell and imports styles/main.css. Prefer semantic HTML and static Astro components. Create reusable components under src/components as needed. Vue integration, Pinia and GSAP are available but optional to use; hydrate only where interaction requires it. Do not assume every project needs these dependencies.

The starter is not a visual identity: establish project-specific audience, content, accessibility needs and design intent before implementation. Keep public routes purposeful. Tests belong in tests, not public demo pages.

Eien owns visual tokens and components; Kōshi owns reusable spatial composition. Native CSS remains appropriate for project-specific layout. Avoid duplicate layout frameworks.
