// tests/login-logo.spec.js
import { expect,test } from '@playwright/test';
import { PageManager } from '../../pageObjects/pageManager.js';
import { readJSON } from '../../utils/readJSONData.js';
import { decrypt } from '../../utils/encryptDecrypt.js';


const invalidUsers = readJSON('./data/InvalidUsers.json');
var pageManager;

test.describe('Login scenarios', () => {
  test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await page.goto(process.env.TEST_URL);
    if (!process.env.TEST_USERNAME || !process.env.TEST_PASSWORD) {
      throw new Error('Environment variables TEST_USERNAME or TEST_PASSWORD are not set.');
    }
  });

  test('should login and display the app logo', async ({ page }) => {
    await pageManager.createLoginPage().login(decrypt(process.env.TEST_USERNAME), decrypt(process.env.TEST_PASSWORD));
    await page.waitForURL('**/users');
    await expect(pageManager.createUsersPage().logo).toBeVisible();
  });

  invalidUsers.forEach((invalidUser) => {
    test(`Logging in with invalid credentials: ${invalidUser.testName}`, async ({ page }) => {
      await pageManager.createLoginPage().login(invalidUser.email, invalidUser.password);
      await expect(pageManager.createUsersPage().logo).not.toBeVisible();
    });
  });

});