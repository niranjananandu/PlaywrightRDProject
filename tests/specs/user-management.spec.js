// tests/user-management.spec.js
import { expect } from '@playwright/test';
import { readJSON } from '../../utils/readJSONData.js';
import { takeTimestampedScreenshot } from '../../utils/screenshotHelper.js';
import { test } from '../fixtures/loginFixture.js';

const users = readJSON('./data/AddValidUsers.json');
const invalidUsers = readJSON('./data/AddInvalidUsers.json');

test.describe.parallel('User Management - Add User', () => {
  test.setTimeout(120000);

  users.forEach((testUser) => {
    test(`should add valid user ${testUser.email} and verify in data grid`,
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

  users.forEach((testUser) => {
  test.only(`Add affiliations to user - ${testUser.email}`, async ({ pageManager, logger }) => {
    await expect(pageManager.createUsersPage().logo).toBeVisible();
    logger.log('Adding affiliations to user');
    await pageManager.createUsersPage().searchUser(testUser.email);
    expect(await pageManager.createUsersPage().isUserInGrid(testUser.email)).toBe(testUser.email);
    await pageManager.createUsersPage().clickUserTableRow();
    await pageManager.createUsersPage().clickAffiliationsTab()
    await pageManager.createUsersPage().clickAddAffilationsButton()
    for (const affiliation of testUser.affiliations) {
    // testUser.affiliations.forEach((affliation) =>{
    await pageManager.createUsersPage().fillAffiliations(affiliation)
    await expect(page.getByTestId('user-panel-items-table')).toMatchAriaSnapshot(`
    - table:
      - rowgroup:
        - row "Affiliation Membership Number Year Joined Expiry Date Primary Affiliation Comments":
          - columnheader "Affiliation"
          - columnheader "Membership Number"
          - columnheader "Year Joined"
          - columnheader "Expiry Date"
          - columnheader "Primary Affiliation"
          - columnheader "Comments"
          - columnheader
          - columnheader
      - rowgroup:
        - row /APEGA \\d+ \\d+ \\d+\\/\\d+\\/\\d+ - Configure Delete/:
          - cell "APEGA"
          - cell /\\d+/
          - cell /\\d+/
          - cell /\\d+\\/\\d+\\/\\d+/
          - cell:
            - checkbox [disabled]
          - cell "-"
          - cell "Configure":
            - button "Configure"
          - cell "Delete":
            - button "Delete"
    `);
  }
  });
});


  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await takeTimestampedScreenshot(page, testInfo.title);
    }
  });

});
