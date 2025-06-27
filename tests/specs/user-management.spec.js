// tests/user-management.spec.js
import { expect } from '@playwright/test';
import { readJSON } from '../../utils/readJSONData.js';
import { takeTimestampedScreenshot } from '../../utils/screenshotHelper.js';
import { test } from '../fixtures/loginFixture.js';

const users = readJSON('./data/AddValidUsers.json');
const invalidUsers = readJSON('./data/AddInvalidUsers.json');

test.describe.parallel('User Management - Add User', () => {
  test.setTimeout(60000);

  users.forEach((testUser) => {
    test.only(`should add valid user ${testUser.email} and verify in data grid`,
      async ({ pageManager , logger}) => {
        
        await expect(pageManager.createUsersPage().logo).toBeVisible();
        logger.log('Filling form to add user')
        await pageManager.createUsersPage().clickAddUserButton();
        await pageManager.createUsersPage().fillUserForm(testUser);
        await expect(pageManager.createUsersPage().saveChangesButton).toBeEnabled();
        await pageManager.createUsersPage().saveChangesButton.click();
        await expect(pageManager.createUsersPage().toastMessage).toBeVisible({ timeout: 10000 });
        logger.log('Successfully added user')
        await pageManager.createUsersPage().searchUser(testUser.email);
        expect(await pageManager.createUsersPage().isUserInGrid(testUser.email)).toBe(testUser.email);
        await expect(pageManager.page).toHaveScreenshot(`User_${testUser.email}.png`,
      {
        fullPage: true,             
        timeout: 5000,              
        animations: 'disabled',     
        threshold: 0.2
      })
      }
    );
  });

  invalidUsers.forEach((invalidTestUser) => {
    test(`Should not be able to add user with invalid data: ${invalidTestUser.testName}`,
      async ({ pageManager ,logger }) => {
        await expect(pageManager.createUsersPage().logo).toBeVisible();
        logger.log('Filling form to add user')
        await pageManager.createUsersPage().clickAddUserButton();
        await pageManager.createUsersPage().fillUserForm(invalidTestUser);
        await expect(pageManager.createUsersPage().saveChangesButton).not.toBeEnabled();
      }
    );
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await takeTimestampedScreenshot(page, testInfo.title);
    }
  });
});