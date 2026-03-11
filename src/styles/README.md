# Styles Guide

This directory manages global style entry, base theme styles, and font setup.

## Directory Layout

```text
src/styles/
  index.css               # Global style entry and imports
  shadcn.css              # shadcn base styles (do not edit manually)
  fonts.ts                # Font configuration
```

## Rules

1. Do not manually modify `shadcn.css`.
2. Use `fonts.ts` to configure and export project font setup.
3. If CSS customization is needed, create a new `.css` file in this directory.
4. Import new style files from `index.css` to make them effective globally.

## CSS Extension Pattern

When adding new global style behavior, follow this flow:

1. Create a file like `scrollbar.css` (or project-specific naming).
2. Put related style rules in that file only.
3. Add an import in `index.css`, for example:

```css
@import "./scrollbar.css";
```

This keeps `index.css` as the single style entry and avoids changing framework base files.

## Checklist For PRs

- `shadcn.css` is unchanged unless there is an exceptional framework-level reason.
- Font changes are done in `fonts.ts`.
- New global CSS is added via a dedicated file, not mixed into unrelated files.
- New CSS file is imported in `index.css`.
