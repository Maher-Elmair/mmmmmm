# E2E Tests

Standalone Playwright specs. Playwright is intentionally **not** in `package.json` — run it on demand via `bunx` so it never ships to production builds.

```bash
# One-time (per machine)
bunx --bun playwright@latest install chromium

# Run all e2e tests (dev server must be on :8080)
bunx --bun playwright@latest test --config tests/e2e/playwright.config.ts

# Point at a different URL
APP_URL=https://preview.example.com \
  bunx --bun playwright@latest test --config tests/e2e/playwright.config.ts
```

## Specs

- `task-timer-guard.spec.ts` — verifies the Timer ↔ Task switch confirmation
  modal fires when switching tasks mid-session, and that each of its three
  actions (keep current, stop & switch, keep timer running) produces the
  correct state without corrupting the timer.
</content>
