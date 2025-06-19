// tests/user-management.spec.js
import { test } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage.js';
import { DashboardPage } from '../pageObjects/DashboardPage.js';
import { getUsers } from '../data/userData.js';

const users = getUsers();

test.describe('User Management - Add User', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('test_automation@k2fly.com', 'A4fd63ddf?ds');
    await page.waitForURL('**/users');
  });
for (const testUser of users) {
    test(
        `should add user ${testUser.email} and verify in data grid`,
        async ({ page }) => {
            const dashboardPage = new DashboardPage(page);
            await dashboardPage.isLogoVisible();
            await dashboardPage.addUser(testUser);
            await dashboardPage.searchUser(testUser.email);
            await dashboardPage.isUserInGrid(testUser.email);
        },60000
    );
}
});
