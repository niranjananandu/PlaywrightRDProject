// tests/user-management.spec.js
import { test,expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage.js';
import { UsersPage } from '../pageObjects/UsersPage.js';
import { getUsers } from '../data/userData.js';
import { get } from 'http';

const users = getUsers('./data/users.json');
var loginPage;
var usersPage;
const invalidUsers = getUsers('./data/usersInvalid.json');

test.describe('User Management - Add User', () => {

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    usersPage = new UsersPage(page);
    await loginPage.goto();
    await loginPage.login('test_automation@k2fly.com', 'A4fd63ddf?ds');
    await page.waitForURL('**/users');
  });

  for (const testUser of users) {
    test.skip(
      `should add user ${testUser.email} and verify in data grid`,
      async ({ page }) => {
        await expect(usersPage.logo).toBeVisible();
        await usersPage.clickAddUserButton();
        await usersPage.fillTitle(testUser.title);
        await usersPage.fillFirstName(testUser.firstName);
        await usersPage.fillLastName(testUser.lastName);
        await usersPage.fillEmail(testUser.email);
        await usersPage.selectSystemRole(testUser.role);
        await expect(usersPage.saveChangesButton).toBeEnabled();
        await usersPage.saveChangesButton.click();
        await expect(usersPage.toastMessage).toBeVisible({ timeout: 10000 });
        await usersPage.searchUser(testUser.email);
        await usersPage.isUserInGrid(testUser.email);
      }, 60000
    );
  }

for (const invalidTestUser of invalidUsers) {
    test.only(
      `Should not be able to add user with invalid data: ${invalidTestUser.testName}`,
      async ({ page }) => {
        await expect(usersPage.logo).toBeVisible();
        await usersPage.clickAddUserButton();
        await usersPage.fillTitle(invalidTestUser.title);
        await usersPage.fillFirstName(invalidTestUser.firstName);
        await usersPage.fillLastName(invalidTestUser.lastName);
        await usersPage.fillEmail(invalidTestUser.email);
        await usersPage.selectSystemRole(invalidTestUser.role);
        await expect(usersPage.saveChangesButton).not.toBeEnabled();
      }, 60000
    );
  }

});