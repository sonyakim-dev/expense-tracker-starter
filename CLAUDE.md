# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

No test suite is configured.

## Architecture

This is a React 19 + Vite single-page app. All application logic lives in a single component: `src/App.jsx`.

**State shape** — `transactions` is an array of `{ id, description, amount, type, category, date }` objects. `amount` is stored as a string (form input value), which causes arithmetic bugs in the summary calculations (`totalIncome`, `totalExpenses`, `balance` use `reduce` but get string concatenation instead of addition).

**Data flow** — no external state library, no persistence (data resets on page refresh). Filtering is derived inline from `transactions` state on every render.

**Categories** — hardcoded array: `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`.

This project is a course starter intentionally containing bugs and rough UI — fixes are applied as exercises.
