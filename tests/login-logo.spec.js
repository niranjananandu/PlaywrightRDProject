// tests/login-logo.spec.js
import { test } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage.js';
import { DashboardPage } from '../pageObjects/DashboardPage.js';

test.describe('Login and Logo Verification', () => {
  test('should login and display the app logo', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login('test_automation@k2fly.com', 'A4fd63ddf?ds');
    // Wait for navigation to dashboard
    await page.waitForURL('**/users');
    await dashboardPage.isLogoVisible();
  });
});
