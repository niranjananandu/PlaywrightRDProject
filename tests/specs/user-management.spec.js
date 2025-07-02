// tests/user-management.spec.js
import { expect } from '@playwright/test';
import { readJSON } from '../../utils/readJSONData.js';
import { takeTimestampedScreenshot } from '../../utils/screenshotHelper.js';
import { test } from '../fixtures/loginFixture.js';

const users = readJSON('./data/AddValidUsers.json');
const invalidUsers = readJSON('./data/AddInvalidUsers.json');

test.describe.parallel('User Management - Add User - Positive and Negative Tests', () => {
  test.setTimeout(60000);

  //Positive users test
  users.forEach((testUser) => {
    test(`should add valid user ${testUser.email} and verify in data grid`,
      async ({ pageManager, logger }) => {

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

  //Negative users test
  invalidUsers.forEach((invalidTestUser) => {
    test(`Should not be able to add user with invalid data: ${invalidTestUser.testName}`,
      async ({ pageManager, logger }) => {
        await expect(pageManager.createUsersPage().logo).toBeVisible();
        logger.log('Filling form to add user')
        await pageManager.createUsersPage().clickAddUserButton();
        await pageManager.createUsersPage().fillUserForm(invalidTestUser);
        await expect(pageManager.createUsersPage().saveChangesButton).not.toBeEnabled();
      }
    );
  });
})


users.forEach((testUser) => {
test.describe(`User Management - Add affiliation,qualification,contact,history,supporting files and account settings for added user - ${testUser.email}`, () => {
test.setTimeout(60000);
  test.beforeEach(async ({ pageManager, logger }) => {
   await expect(pageManager.createUsersPage().logo).toBeVisible();
      logger.log('Successfully landed on \\users page')
      logger.log('Searching for the user')
      await pageManager.createUsersPage().searchUser(testUser.email);
      expect(await pageManager.createUsersPage().isUserInGrid(testUser.email)).toBe(testUser.email);
      await pageManager.createUsersPage().clickUserTableRow();
      logger.log('Found the user')
  })



    test.only(`Add affiliations to user - ${testUser.email}`, async ({ pageManager, logger }) => {
      logger.log('Adding affiliations to user');
      await pageManager.createUsersPage().clickAffiliationsTab()
      if (!testUser.affiliations || testUser.affiliations.length === 0) {
        logger.log(`No affiliations to add for user ${testUser.email}`);
      }
      else {
        for (const affiliation of testUser.affiliations) {
          await pageManager.createUsersPage().clickAddAffilationsButton()
          await pageManager.createUsersPage().fillAffiliations(affiliation)
          await pageManager.createUsersPage().submitForm();
          expect(await pageManager.createUsersPage().verifyAddedAffiliation(affiliation)).toBeTruthy()
          await pageManager.createUsersPage().clickSaveChanges();
          await pageManager.createUsersPage().waitForDataSuccessfullySavedToast();
          logger.log(`Affiliations added for user ${testUser.email}`);
        }
      }
      await expect(pageManager.page).toHaveScreenshot(`UserAffiliations_${testUser.email}.png`,
        {
          fullPage: true,
          timeout: 5000,
          animations: 'disabled',
          threshold: 0.2
        })
    });

    test(`Add qualifications to user - ${testUser.email}`, async ({ pageManager, logger }) => {
      logger.log('Adding qualifications to user');
      await pageManager.createUsersPage().clickQualificationsTab()
      if (!testUser.qualifications || testUser.qualifications.length === 0) {
        logger.log(`No qualifications to add for user ${testUser.email}`);
      }
      else {
        for (const qualification of testUser.qualifications) {
          await pageManager.createUsersPage().clickAddQualificationsButton()
          await pageManager.createUsersPage().fillQualifications(qualification)
          await pageManager.createUsersPage().submitForm();
          expect(await pageManager.createUsersPage().verifyAddedQualification(qualification)).toBeTruthy()
          await pageManager.createUsersPage().clickSaveChanges();
          await pageManager.createUsersPage().waitForDataSuccessfullySavedToast();
          logger.log(`Qualifications added for user ${testUser.email}`);
        }
      }
      await expect(pageManager.page).toHaveScreenshot(`UserQualifications_${testUser.email}.png`,
        {
          fullPage: true,
          timeout: 5000,
          animations: 'disabled',
          threshold: 0.2
        })
    });



  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await takeTimestampedScreenshot(page, testInfo.title);
    }
  });
});
});
