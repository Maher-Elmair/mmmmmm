import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: '.',
  timeout: 30_000,
  use: {
    baseURL: process.env.APP_URL ?? 'http://localhost:8080',
    headless: true,
    viewport: { width: 1280, height: 900 },
  },
})
