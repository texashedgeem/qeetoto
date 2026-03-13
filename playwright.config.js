// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright configuration for Qeetoto E2E tests.
 * Tests run against the local Next.js dev server (http://localhost:3000).
 * Start the server before running tests: npm run dev
 */
module.exports = defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'tests/reports/html' }],
    ['junit', { outputFile: 'tests/reports/junit/results.xml' }],
  ],
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
