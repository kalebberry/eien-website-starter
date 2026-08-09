# The Eien Framework: A Design System Template

Welcome to the Eien Framework, a complete design system and website starter kit built with Astro, modern native CSS (featuring CSS Cascade Layers `@layer`), and a token-based architecture. This template is designed for creating clean, content-focused web experiences with a calm, monochrome aesthetic inspired by manga and inkwork.

The `index.astro` page serves as a living style guide and a demonstration of all core features.

---

## 🚀 Getting Started

1. **Install Dependencies:**

    ```bash
    npm install
    ```

2. **Run the Development Server:**
    ```bash
    npm run dev
    ```
    This command will automatically:
    - Generate CSS variables from your design tokens.
    - Start the Astro development server at `http://localhost:4321`.

---

## 🏛️ Core Architecture

This project is built on a clear, layered architecture that separates design decisions from implementation.

### 1. Design Tokens (`/src/design-tokens/tokens.json`)

This file is the **single source of truth** for your core design system. All fundamental visual properties like colors and the typographic scale are defined here.

- **To change colors or typography:** Modify the values in `tokens.json`.
- **To apply changes:** The `npm run dev` command automatically runs the `npm run tokens` script, which executes `convert-tokens.js`. This script reads `tokens.json` and generates the necessary CSS custom properties in `src/styles/tokens/`.

### 2. Modern Native CSS Architecture (`/src/styles/`)

The styling is managed by a modern native CSS architecture organized into **CSS Cascade Layers** (`@layer`) in `src/styles/main.css`:

```css
@layer reset, base, compositions, components, pages, utilities;
```

- **/tokens:** Generated & native CSS custom properties (`font-sizes.css`, `theme.css`, `space-sizes.css`, `tokens.css`).
- **/base:** Global styles & resets (`reset.css`, `global.css`).
- **/compositions:** Intrinsic layout patterns (`grid.css`, `flex-grid`, `cluster.css`, `repel.css`, `sidebar.css`, `switcher.css`, `container.css`, `flow.css`).
- **/components:** Styles for reusable UI components (`button.css`, `card.css`).
- **/pages:** Page-specific styling rules (`landing.css`).
- **/utilities:** Low-level utility classes (`colors.css`, `typography.css`, `spacing.css`, `tone-lines.css`).

---

## 🛠️ How to Use the System

This template provides a comprehensive set of tools to build consistent and beautiful user interfaces.

### Layouts (Grid & Flexbox)

The system includes a powerful, dual-engine layout system for creating responsive page structures without media queries.

- **`.grid` (CSS Grid):** For complex, two-dimensional layouts using `repeat(auto-fit, minmax(min-size, 1fr))`.
- **`.flex-grid` (Flexbox):** For simpler, one-dimensional wrapping rows.

Both engines support `data-cols` attributes for column count presets and `data-span` for item spanning.

**Example:**

```html
<!-- A 4-column responsive grid -->
<div class="grid" data-cols="4" style="--gutter: 1rem;">
	<div class="card">...</div>
	<div class="card" data-span="2">This one is wider</div>
	...
</div>
```

> For an interactive playground, visit **/demo/playground**.

### Typography

The fluid typography system ensures text scales smoothly across all screen sizes using CSS `clamp()`. All font sizes are generated from `tokens.json`.

**Usage:**

Apply `.fs-step-*` utility classes to any element to set its font size.

```html
<h1 class="fs-step-5">A Major Headline</h1>
<p class="fs-step-0">Body text that scales fluidly.</p>
```

### Spacing (Padding & Margin)

The spacing scale provides a full set of native CSS utility classes for `margin` and `padding`.

- **Generation:** The `src/styles/utilities/spacing.css` file defines utility classes powered by `--space-*` custom properties.

**Usage:**

```html
<!-- Apply padding to all sides -->
<div class="padding-16">...</div>

<!-- Apply margin only to the top -->
<div class="margin-block-start-32">...</div>
```

### Colors

All theme colors are generated from `tokens.json`. The system automatically generates semantic CSS variables for both light and dark modes.

**Usage:**

```css
.my-component {
	background-color: var(--background);
	color: var(--text);
	border: 1px solid var(--border-weak);
}
```

---

## 🧩 Components

This template includes a set of pre-styled components that you can use and extend. The `index.astro` page serves as a live component library.

- `.card--bw`: The standard card component.
- `.btn`, `.btn--primary`, `.btn--ghost`: Button variants.
- `.tag`: A small, pill-shaped tag for metadata.
- `.poster`: A figure with a stylized image placeholder.

---

## ✨ Client-Side Interactivity (Vue.js)

For interactive components ("islands of interactivity"), this template uses Astro's official **Vue.js integration**, along with **Pinia** for state management.

### Using Vue Components & Pinia

Vue components work directly in Astro templates using standard `client:*` directives. Pinia is automatically initialized globally via `src/app.ts`.

**Workflow:**

1. **Create your Vue component** in `/src/components/vue/` (e.g., `ExampleComponent.vue`).
2. **Import and render the component** in any `.astro` page with a client directive:

   ```astro
   ---
   import ExampleComponent from '@/components/vue/ExampleComponent.vue';
   ---

   <!-- Render Vue component as an interactive Astro island -->
   <ExampleComponent client:load />
   ```

3. **Access Pinia Stores**: Inside your Vue component, simply import and use Pinia stores directly:

   ```vue
   <script setup lang="ts">
   import { useTransactionsStore } from '@/stores/useTransactionsStore';

   const transactionsStore = useTransactionsStore();
   </script>
   ```

## 📜 Available Scripts

All scripts are defined in `package.json`.

- `npm run dev`: Starts the development server with automatic token generation.
- `npm run build`: Builds the site for production.
- `npm run preview`: Previews the production build locally.
- `npm run tokens`: Manually regenerates design tokens.
