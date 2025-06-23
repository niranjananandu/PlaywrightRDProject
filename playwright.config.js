// @ts-check
import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

const ENV = process.env.ENV || 'test'; // Default to 'test' if ENV is not set
const envFilePath = `.env.${ENV}`;
// console.log("DOT ENV KEY: "+ process.env.DOTENV_KEY);

if (fs.existsSync(envFilePath)) {
  console.log(`✅ Loading environment: ${ENV}`);
  dotenv.config({ path: envFilePath });
} else {
  throw new Error(`❌ Environment file not found: ${envFilePath}`);
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
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    experimentalMcp: true,
    "baseURL": process.env.TEST_URL,
    launchOptions: {
      args: ["--start-maximized"]
    },
    trace: 'on-first-retry'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { viewport: null }
    }
  ]
});

