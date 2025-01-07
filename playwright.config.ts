import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 45000, // Test timeout
  retries: 2, // Retry failed tests
  workers: 4, // Run tests in parallel
  use: {
    headless: false,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'http://localhost:3000',
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'WebKit',
      use: { browserName: 'webkit' },
    },
  ],
});
