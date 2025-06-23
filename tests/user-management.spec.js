// tests/user-management.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage.js';
import { UsersPage } from '../pageObjects/UsersPage.js';
import { readJSON } from '../utils/readJSONData.js';
import { takeTimestampedScreenshot } from '../utils/screenshotHelper';

const users = readJSON('./data/AddValidUsers.json');
var loginPage;
var usersPage;
const invalidUsers = readJSON('./data/AddInvalidUsers.json');

test.describe.parallel('User Management - Add User', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    usersPage = new UsersPage(page);
    await page.goto(process.env.TEST_URL);
    await loginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
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

  /**TO DO
   * Add credentials to environment variables -- DONE
   * Add more tests and helper methods
   * Setup different projects and environments/profiles
   * Make the data re-usable by making them dynamic - faker library
   * Explore using fixtures for common setup 
   * Figure out how to encrypt sensitive data like passwords -- Tried using dotnet-vault but can only configure it for one environment at a time on the free version. 
   * Will rather try using crypto-js and dotenv to encrypt and decrypt sensitive data.   * 
   * */
});