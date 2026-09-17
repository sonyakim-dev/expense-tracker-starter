---
name: deploy
description: Use when deploying the expense-tracker-starter app to staging, or when the user asks to "deploy", "ship", or "push to staging".
---

# Deploy

## Overview

Deploys this app to staging in three steps: run tests, build the production bundle, push to staging. Stop immediately if any step fails — never proceed to the next step on a failure.

## Steps

1. **Run all tests**
   ```bash
   npm test
   ```
   If this fails, stop and report the failing tests. Do not build or deploy.

2. **Build the production bundle**
   ```bash
   npm run build
   ```
   If this fails, stop and report the build error. Do not deploy.

3. **Push to staging**
   ```bash
   npm run deploy:staging
   ```

## Common Mistakes

- Skipping straight to `deploy:staging` without running tests/build first — always run all three steps in order.
- Continuing to the next step after a failure — a failed test run or build means the deploy stops there.
