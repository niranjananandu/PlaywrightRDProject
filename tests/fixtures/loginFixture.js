import { test as base } from '@playwright/test';

import { PageManager } from '../../pageObjects/pageManager.js';
import { decrypt } from '../../utils/encryptDecrypt.js';


export const test = base.extend({
  pageManager: async ({ page }, use) => {
    const pageManager = new PageManager(page);
    // Perform login steps
     await page.goto(process.env.TEST_URL);
    if (!process.env.TEST_USERNAME || !process.env.TEST_PASSWORD) {
      throw new Error('Environment variables TEST_USERNAME or TEST_PASSWORD are not set.');
    }
    await pageManager.createLoginPage().login(decrypt(process.env.TEST_USERNAME), decrypt(process.env.TEST_PASSWORD));
    await page.waitForURL('**/users');
    // Provide the page in logged-in state to the test
    await use(pageManager);
  }
});