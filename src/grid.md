# 📐 Grid & Flex Layout System — Cheatsheet

## 🔑 Core Concepts

- **Engines**
  - `.grid` → CSS Grid (2D control, spans, dense packing)
  - `.flex-grid` → Flexbox (1D wrapping rows)
- **Custom Properties**
  - `--gutter` → spacing between items
  - `--grid-min-item-size` → min width for grid tracks
  - `--grid-placement` → `auto-fit` or `auto-fill`
- **Container Queries**
  - Wrap in `.grid-container`, `.sidebar-grid__container`, or `.masonry__container`
  - These enable `@container` rules with `container-type: inline-size`

---

## 🎨 Classes

- **Placement (Grid)**
  - `.grid--fit` → `auto-fit` (collapses empty tracks)
  - `.grid--fill` → `auto-fill` (keeps phantom tracks)
- **Packing**
  - `.grid--dense` → fills gaps with later items (Grid only)
- **Gutters**
  - `.gap-0` (0), `.gap-2` (0.5rem), `.gap-4` (1rem), `.gap-6` (1.5rem)

---

## ⚙️ Data Attributes

- **`data-cols="N"`**
  - Grid → adjusts `--grid-min-item-size` for N-up layouts
  - Flex → sets child `flex-basis` & `min-width` for wrapping

---

- **`data-span="N"`**
  - Grid → item spans N columns (`grid-column: span N`)
  - Flex → item `flex-basis` is adjusted to span N columns
- **`data-row-span="N"`** (Grid only) → item spans N rows (`grid-row: span N`)

## 📦 Usage Patterns

### Auto-Grid (Responsive Grid)

```html
<div class="grid grid--fit gap-4" style="--grid-min-item-size: 16rem">
	<article class="card">A</article>
	<article class="card">B</article>
	<article class="card">C</article>
</div>

<div class="grid gap-6" data-cols="4">…</div>
<div class="flex-grid gap-4" data-cols="3">…</div>

<div class="grid grid--dense gap-4" data-cols="4">
	<div class="card" data-span="2">Wide</div>
	<div class="card" data-row-span="2">Tall</div>
</div>
```

🧭 Engine Choice

Use Grid → complex, responsive, spans, masonry-like dense packing

Use Flexbox → simpler row-based wrapping, consistent min-width columns

🚑 Debugging Quick Tips

Items too squished? → Increase --grid-min-item-size (Grid) or --min-width (Flex)

Weird gaps? → Switch .grid--fill ↔ .grid--fit

Spans not applying? → Ensure you’re inside .grid, not .flex-grid

Container queries not working? → Parent must use container-type: inline-size

Missing gutters? → Add .gap-\* or set --gutter
