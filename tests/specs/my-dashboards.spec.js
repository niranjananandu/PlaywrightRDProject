import { expect } from '@playwright/test';
import { test } from '../fixtures/loginFixture.js';

test.describe('Dashboard Navigation', () => {
  test.setTimeout(60000)

  test.beforeEach('should navigate to Dashboard after login and verify title', async ({ pageManager,logger }) => {
    logger.log('Navigating to My Dashboards')
    await pageManager.createLandingPage().openDrawer();
    await pageManager.createLandingPage().goToDashboard();
    await expect(pageManager.page).toHaveURL(/.*dashboards-sheets/);
    await expect(pageManager.page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    logger.log('My Dashboards loaded successfully')
  });


  test('Run a dashboard',async({pageManager,logger})=>{

    logger.log('Running a dashboard')
  })
});
