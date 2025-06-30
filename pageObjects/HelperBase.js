
import { CommonLocators } from './CommonLocators';

class HelperBase extends CommonLocators {
    constructor(page) {
        super(page);
        if (!page) {  
      throw new Error('Page object is not initialized');
    }
    }

    async waitForElement(selector) {
        await this.page.waitForSelector(selector);
    }
    async waitForSeconds(numberOfSeconds) {
        await this.page.waitForTimeout(numberOfSeconds * 1000);
    }
    
    async getElementText(selector) {
        return await this.page.textContent(selector);
    }
}

export { HelperBase };