// tests/login-logo.spec.js
import { expect, test } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage.js';
import { UsersPage } from '../pageObjects/UsersPage.js';
import { readJSON } from '../utils/readJSONData.js';

const invalidUsers = readJSON('./data/InvalidUsers.json');
let loginPage;
let usersPage;

test.describe('Login and Logo Verification', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    usersPage = new UsersPage(page);
    await page.goto(process.env.TEST_URL);
  });
  
  test('should login and display the app logo', async ({ page }) => {
    await loginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
    await page.waitForURL('**/users');
    await expect(usersPage.logo).toBeVisible();
  });

  invalidUsers.forEach((invalidUser) => {
    test(`Logging in with invalid credentials: ${invalidUser.testName}`, async ({ page }) => {
      await loginPage.login(invalidUser.email, invalidUser.password);
      await expect(usersPage.logo).not.toBeVisible();
    });
  });

});