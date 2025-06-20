// tests/user-management.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage.js';
import { UsersPage } from '../pageObjects/UsersPage.js';
import { getUsers } from '../data/userData.js';
import { takeTimestampedScreenshot } from '../utils/screenshotHelper';

const users = getUsers('./data/users.json');
var loginPage;
var usersPage;
const invalidUsers = getUsers('./data/usersInvalid.json');

test.describe.parallel('User Management - Add User', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    usersPage = new UsersPage(page);
    await loginPage.goto();
    await loginPage.login('test_automation@k2fly.com', 'A4fd63ddf?ds');
    await page.waitForURL('**/users');
  });

  users.forEach((testUser) => {
    test(`should add user ${testUser.email} and verify in data grid`,
      async ({ page }) => {
        await expect(usersPage.logo).toBeVisible();
        await usersPage.clickAddUserButton();
        await usersPage.fillUserForm(testUser);
        await expect(usersPage.saveChangesButton).toBeEnabled();
        await usersPage.saveChangesButton.click();
        await expect(usersPage.toastMessage).toBeVisible({ timeout: 10000 });
        await usersPage.searchUser(testUser.email);
        await usersPage.isUserInGrid(testUser.email);
      }, 60000
    );
  });

  invalidUsers.forEach((invalidTestUser) => {
    test(`Should not be able to add user with invalid data: ${invalidTestUser.testName}`,
      async ({ page }) => {
        await expect(usersPage.logo).toBeVisible();
        await usersPage.clickAddUserButton();
        await usersPage.fillUserForm(invalidTestUser);
        await expect(usersPage.saveChangesButton).not.toBeEnabled();
      }, 60000
    );
  }
  );

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await takeTimestampedScreenshot(page, testInfo.title);
    }
  });

});