import { test as base } from '@playwright/test';
import {createLogger} from '../../utils/logger.js'
import { PageManager } from '../../pageObjects/pageManager.js';
import { decrypt } from '../../utils/encryptDecrypt.js';


export const test = base.extend({
  logger: async ({}, use, testInfo) => {
    const logger = createLogger(testInfo.title);
    logger.log('Logger initialized');
    await use(logger);
  },
  pageManager: async ({ page,logger }, use) => {
    const pageManager = new PageManager(page);
    logger.log('Navigating to login page...');
    await page.goto(decrypt(process.env.TEST_URL));
    if (!process.env.TEST_USERNAME || !process.env.TEST_PASSWORD) {
      throw new Error('Environment variables TEST_USERNAME or TEST_PASSWORD are not set.');
    }
    await pageManager.createLoginPage().login(decrypt(process.env.TEST_USERNAME), decrypt(process.env.TEST_PASSWORD));
    await page.waitForURL('**/users');
    logger.log('Login successful, on users page');
    // Provide the page in logged-in state to the test
    await use(pageManager);
  }
});