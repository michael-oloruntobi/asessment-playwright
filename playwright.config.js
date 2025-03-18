// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Validate environment variables
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

if (!username || !password) {
  throw new Error(
    'USERNAME and PASSWORD must be defined in the .env file.'
  );
}

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,
    headless: false,
    httpCredentials: {
      username: username, // Now guaranteed to be a string
      password: password, // Now guaranteed to be a string
    },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Capture screenshot on test failure */
    screenshot: 'only-on-failure', // Options: 'off', 'on', 'only-on-failure'

    /* Browser launch arguments */
    launchOptions: {
      args: [
        '--disable-blink-features=AutomationControlled', // Disable automation detection
        '--no-sandbox', // May help in some environments
        '--disable-web-security', // Not recommended for production use
        '--disable-infobars', // Prevent infobars
        '--disable-extensions', // Disable extensions
        '--start-maximized', // Start maximized
        '--window-size=1280,720', // Set a specific window size
      ],
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

  ],
});