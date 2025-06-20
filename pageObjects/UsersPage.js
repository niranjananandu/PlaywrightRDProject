import { expect } from '@playwright/test';

class UsersPage {
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
    this.systemRoleField = null;
    this.userInGridName =  null;
    this.toastMessage = page.getByText('Your data has been successfully saved');
    this.menu = page.locator('#menu-')
  }

  setsystemRoleField(text) {
    this.systemRoleField = this.page.locator(`li[role="option"]:has-text("${text}")`);
  }

  setUserInGridName(text) {
    this.userInGridName = `tbody[data-testid="common-table-body"] tr:first-child td:nth-child(5):has-text("${text}")`;
  }

  async clickAddUserButton() {
    await this.addUserButton.click();
  }

  async fillTitle(title) {
        await this.titleInput.fill(title);
    }

    async fillFirstName(firstName) {
        await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName) {
        await this.lastNameInput.fill(lastName);
    }

    async fillEmail(email) {
        await this.emailInput.fill(email);
    }

    async selectSystemRole(role) {
        this.setsystemRoleField(role)
        await this.systemRole.click();
        try{
                 await this.systemRoleField.click();
        } catch (error) {
            await this.menu.click();          
        }
    
    }

    async submitForm() {
        await this.page.click(this.submitButton);
    }

    async getErrorMessage() {
        return await this.page.textContent(this.errorMessage);
    }
  
  async searchUser(username) {
    await this.searchInput.fill(username);  
  }

  async isUserInGrid(username) {
    this.setUserInGridName(username);
    const cell = await this.page.waitForSelector(this.userInGridName);
    const cellText = await cell.textContent();
    expect(cellText.trim()).toBe(username);
  }


}

export { UsersPage };
