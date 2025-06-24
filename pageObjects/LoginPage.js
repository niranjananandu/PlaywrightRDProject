import { HelperBase } from './HelperBase';

class LoginPage extends HelperBase{
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    if (!page) {  
      throw new Error('Page object is not initialized');
    }
    this.emailInput = page.getByRole('textbox', { name: 'Email address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
  }
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.continueButton.click();
  }
}

export { LoginPage };
