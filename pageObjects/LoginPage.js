// pageObjects/LoginPage.js
// Page Object for Login Page
import { expect } from '@playwright/test';

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
  }

  async goto() {
    await this.page.goto('https://k2f-syd-tst-rd-cdne-spa.azureedge.net/');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.continueButton.click();
  }
}

export { LoginPage };
