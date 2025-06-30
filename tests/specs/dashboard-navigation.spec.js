import { expect } from '@playwright/test';
import { test } from '../fixtures/loginFixture.js';

test.describe('Dashboard Navigation', () => {
  test('should navigate to Dashboard after login and verify title', async ({ pageManager }) => {
    await pageManager.createLandingPage().openDrawer();
    await pageManager.createLandingPage().goToDashboard();
    await expect(pageManager.page).toHaveURL(/.*dashboards-sheets/);
    await expect(pageManager.page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });
});
