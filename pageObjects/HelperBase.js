class HelperBase{
    constructor(page) {
        this.page = page;
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