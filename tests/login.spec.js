import { test, expect } from '@playwright/test';
import LoginPage from '../pageObjects/LoginPage';

test.describe('Login Tests', () => {
    let loginPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto('https://k2f-syd-tst-rd-cdne-spa.azureedge.net/', { timeout: 60000 });
    });


    test('Login with valid credentials', async ({ page }) => {
        await loginPage.login('test_automation@k2fly.com', 'A4fd63ddf?ds');
        expect(await loginPage.isLogoVisible()).toBeTruthy();
    
    });

    test('Login with invalid credentials', async ({ page }) => {
        await loginPage.login('test_automation@k2fly.com', 'A4fd63ddf');
        expect(await loginPage.isLogoVisible()).toBeFalsy();  

    });
});

