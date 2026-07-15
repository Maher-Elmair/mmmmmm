/**
 * E2E — Timer ↔ Task guard
 *
 * Verifies the protection layer that prevents accidental loss of an in-flight
 * Pomodoro session when the user picks a different task.
 *
 * How to run (standalone, no dev-deps in package.json):
 *   bunx --bun playwright@latest install chromium
 *   bunx --bun playwright@latest test tests/e2e/task-timer-guard.spec.ts \
 *     --config tests/e2e/playwright.config.ts
 *
 * Assumes the dev server is running at http://localhost:8080.
 *
 * Scenarios covered:
 *   1. Selecting a new task mid-session opens the confirmation modal.
 *   2. "Keep current task" cancels the switch — active task and timer intact.
 *   3. "Stop timer & switch task" resets the timer and reassigns focus.
 *   4. "Keep timer running on new task" reassigns the active task without
 *      resetting the timer.
 */
import { test, expect, type Page } from '@playwright/test'

const APP_URL = process.env.APP_URL ?? 'http://localhost:8080'

async function addTask(page: Page, title: string) {
  await page.getByRole('button', { name: /add task/i }).click()
  await page.getByPlaceholder(/what are you working on/i).fill(title)
  await page.getByRole('button', { name: /^add$/i }).click()
}

async function selectTask(page: Page, title: string) {
  await page.getByText(title, { exact: true }).click()
}

async function startTimer(page: Page) {
  // Timer play button — labelled "Start" or via play icon.
  await page.getByRole('button', { name: /start|play/i }).first().click()
}

test.describe('Timer ↔ Task switch guard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL)
    // Reset persistent state to keep runs deterministic.
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('switching task mid-session opens confirmation modal', async ({ page }) => {
    await addTask(page, 'Task Alpha')
    await addTask(page, 'Task Beta')
    await selectTask(page, 'Task Alpha')
    await startTimer(page)

    await selectTask(page, 'Task Beta')

    const modal = page.getByRole('alertdialog')
    await expect(modal).toBeVisible()
    await expect(modal.getByText(/focus session is already in progress/i)).toBeVisible()
  })

  test('"Keep current task" preserves active task and timer', async ({ page }) => {
    await addTask(page, 'Task Alpha')
    await addTask(page, 'Task Beta')
    await selectTask(page, 'Task Alpha')
    await startTimer(page)

    await selectTask(page, 'Task Beta')
    await page.getByRole('button', { name: /keep current task/i }).click()

    const state = await page.evaluate(() => {
      const raw = localStorage.getItem('focusflow-storage')
      return raw ? JSON.parse(raw).state : null
    })
    const alpha = state.tasks.find((t: { title: string }) => t.title === 'Task Alpha')
    expect(state.activeTaskId).toBe(alpha.id)
    expect(state.isRunning ?? state.sessionInProgress).toBeTruthy()
  })

  test('"Stop timer & switch task" resets timer and reassigns focus', async ({ page }) => {
    await addTask(page, 'Task Alpha')
    await addTask(page, 'Task Beta')
    await selectTask(page, 'Task Alpha')
    await startTimer(page)

    await selectTask(page, 'Task Beta')
    await page.getByRole('button', { name: /stop timer.*switch/i }).click()

    const state = await page.evaluate(() => {
      const raw = localStorage.getItem('focusflow-storage')
      return raw ? JSON.parse(raw).state : null
    })
    const beta = state.tasks.find((t: { title: string }) => t.title === 'Task Beta')
    expect(state.activeTaskId).toBe(beta.id)
    expect(state.sessionInProgress).toBeFalsy()
  })

  test('"Keep timer running on new task" reassigns without reset', async ({ page }) => {
    await addTask(page, 'Task Alpha')
    await addTask(page, 'Task Beta')
    await selectTask(page, 'Task Alpha')
    await startTimer(page)

    const before = await page.evaluate(() => {
      const raw = localStorage.getItem('focusflow-storage')
      return raw ? JSON.parse(raw).state.timeLeft : null
    })

    await selectTask(page, 'Task Beta')
    await page.getByRole('button', { name: /keep timer running/i }).click()

    const after = await page.evaluate(() => {
      const raw = localStorage.getItem('focusflow-storage')
      return raw ? JSON.parse(raw).state : null
    })
    const beta = after.tasks.find((t: { title: string }) => t.title === 'Task Beta')
    expect(after.activeTaskId).toBe(beta.id)
    // Timer not reset — within a couple of seconds of the pre-switch reading.
    expect(Math.abs((before ?? 0) - after.timeLeft)).toBeLessThan(5)
  })
})
