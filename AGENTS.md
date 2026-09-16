# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

No test suite is configured.

## Architecture

This is a React 19 + Vite single-page app with four components:

- **`App`** — holds `transactions` state and `categories`. Passes data down; no other logic.
- **`Summary`** (`src/Summary.jsx`) — receives `transactions`, computes `totalIncome`, `totalExpenses`, and `balance` internally.
- **`TransactionForm`** (`src/TransactionForm.jsx`) — owns its own form field state (`description`, `amount`, `type`, `category`). Calls `onAdd(transaction)` prop on submit.
- **`TransactionList`** (`src/TransactionList.jsx`) — receives `transactions` and `categories`, owns filter state (`filterType`, `filterCategory`), derives the filtered list internally.

**State shape** — `transactions` is an array of `{ id, description, amount, type, category, date }` where `amount` is a number.

**Data flow** — no external state library, no persistence (data resets on page refresh).

**Categories** — hardcoded array in `App`: `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`, passed as a prop to `TransactionForm` and `TransactionList`.

This project is a course starter — fixes and refactors are applied as exercises.
