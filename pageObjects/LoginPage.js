import { page } from '@playwright/test';

class LoginPage {

    constructor(page) {
        this.page = page;
        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Password');
        this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
        this.logo = page.getByRole('img', { name: 'Logo' });
    }


    async login(username, password) {
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);
        await this.continueButton.click();
    }
    async isLogoVisible() {

        try {
            await this.logo.waitFor({ state: 'visible', timeout: 10000 });
        } catch (error) {
            return false
        }
        return true;
    }
}

export default LoginPage;