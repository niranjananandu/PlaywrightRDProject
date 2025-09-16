import { CommonLocators } from './CommonLocators';

class HelperBase extends CommonLocators {
    getMonthNumber(monthName) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const idx = months.findIndex(
            m => m.toLowerCase() === String(monthName).toLowerCase()
        );
        if (idx !== -1) {
            return idx + 1; // 1-based month number
        }
        throw new Error('Invalid month name: ' + monthName);
    }

    constructor(page) {
        super(page);
        if (!page) {
            throw new Error('Page object is not initialized');
        }
    }

    async clickElement(selector){
        await selector.click()
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

    async selectDate(date) {
        const [day, month, year] = date.split('/');
        const yearBtn = this.page.locator(`//button[contains(@class,'MuiPickersYear') and text()="${year}"]`);
        const label = this.page.locator('.MuiPickersCalendarHeader-label');
        const prevMonthBtn = this.page.getByLabel('Previous month');
        const nextMonthBtn = this.page.getByLabel('Next month');
        const dayBtn = this.page.getByRole('gridcell', { name: `${day}` }).first();

        await yearBtn.click();
        const [currentMonth] = (await label.textContent()).split(' ');
        const expectedMonth = Number(month);
        const currentMonthNum = this.getMonthNumber(currentMonth);
        const diff = expectedMonth - currentMonthNum;
        const navBtn = diff < 0 ? prevMonthBtn : nextMonthBtn;
        for (let i = 0; i < Math.abs(diff); i++) {
            await navBtn.click();
        }
        await dayBtn.click();
    }
        
    async selectYear(year){
        this.year = this.page.locator(`//button[contains(@class,'MuiPickersYear') and text()="${year}"]`);
        await this.year.click();
    }
    
    async waitForDataSuccessfullySavedToast(){
        await this.dataSuccessfullySaved.waitFor({ state: 'visible' });
    }
}

export { HelperBase };