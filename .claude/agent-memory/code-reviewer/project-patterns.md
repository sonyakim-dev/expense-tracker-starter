---
name: project-patterns
description: Architecture conventions, anti-patterns, and code style observations across the expense tracker codebase
metadata:
  type: project
---

## Code style observations
- Arrow function components throughout (no `function` declarations except App — actually App uses `function` too; mixed but not inconsistent)
- All components use `function` declarations (not arrow functions) — consistent
- CSS variables used for all design tokens in index.css (--ink, --paper, --brass, etc.)
- Category colors are defined TWICE: in index.css as CSS variables (--cat-food, etc.) and in categoryColors.js as hex strings. These are not kept in sync by any mechanism.

## Known bugs / issues found in first full review (2026-09-19)
- App.jsx line 13: "Freelance Work" seeded as `type: "expense"` but logically should be `type: "income"` — seed data bug
- TransactionForm.jsx: no input validation beyond empty-check. Negative amounts and non-numeric edge cases (e.g., "1e9", "Infinity") pass through `parseFloat` unchecked
- TransactionForm.jsx: `id: Date.now()` is not collision-safe if two transactions are added in the same millisecond (low risk in practice but noted)
- Summary.jsx: `toLocaleString()` with no locale/options produces locale-dependent output (no currency options, no decimal forcing)
- TransactionList.jsx line 17: `window.confirm` blocks the main thread and is inaccessible to screen readers; no keyboard-safe confirmation pattern
- CategoryChart.jsx: color hex strings in categoryColors.js duplicate the CSS variables in index.css — single source of truth violated

## Architecture observations
- `categories` array is hardcoded in App and passed as a prop — noted as intentional per CLAUDE.md
- `categoryColors.js` exports both the map object and a helper function — clean pattern, used correctly in both CategoryChart and TransactionList
- No memoization anywhere — appropriate given app size, but Summary and CategoryChart both do O(n) passes on every render
- `handleAdd` in App uses spread (`[...transactions, transaction]`) rather than functional updater form — fine at this scale but fragile under concurrent updates
- `handleDelete` in App uses functional filter correctly but also not using functional updater form
- CSS uses global selectors (`form`, `table`, `th`, `td`) rather than scoped classes — will cause styling conflicts if additional forms or tables are ever added

## Naming / readability notes
- Single-letter variable `t` used consistently for transaction items throughout — acceptable given context but worth noting
- `filtered` in TransactionList is a `let` that gets reassigned — could be a single-expression derivation with chained `.filter()`
- `handleDelete` exists in both App (the actual state setter) and TransactionList (the confirm wrapper) — same name, different responsibilities; the TransactionList one would be clearer as `confirmAndDelete` or `handleDeleteClick`
