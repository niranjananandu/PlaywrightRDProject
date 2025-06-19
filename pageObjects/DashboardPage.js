// pageObjects/DashboardPage.js
// Page Object for Dashboard/Main Page after login
import { expect } from '@playwright/test';

class DashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.logo = page.getByRole('img', { name: 'Logo' });
    this.addUserButton = page.getByRole('button', { name: 'Add User' });
    this.saveChangesButton = page.getByRole('button', { name: 'Save Changes' });
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
     this.titleInput = page.getByLabel('Title');
    this.firstNameInput = page.getByLabel('First Name');
    this.lastNameInput = page.getByLabel('Last Name');
    this.emailInput = page.getByLabel('Email');
    this.systemRole = page.locator('div[data-testid="user-role-id-field"]');
    this.toastMessage = page.getByText('Your data has been successfully saved');
  }

  async isLogoVisible() {
    await expect(this.logo).toBeVisible();
  }

  async addUser({ title, firstName, lastName, email, role }) {
    await this.addUserButton.click();
    await this.titleInput.fill(title);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.systemRole.click();
    await this.selectSystemRole(role);
    await expect(this.saveChangesButton).toBeEnabled();
    await this.saveChangesButton.click();
    // Wait for success toast
    await expect(this.toastMessage).toBeVisible({ timeout: 10000 });
  }

  async selectSystemRole(role) {
    const roleOption = this.page.locator(`div[aria-label="${role}"]`);
    await roleOption.click();
  }


  async searchUser(username) {
    await this.searchInput.fill(username);  
  }

  async isUserInGrid(username) {
    const cell = await this.page.waitForSelector(`tbody[data-testid="common-table-body"] tr:first-child td:nth-child(5):has-text("${username}")`);
    const cellText = await cell.textContent();
    expect(cellText.trim()).toBe(username);
  }
}

export { DashboardPage };
