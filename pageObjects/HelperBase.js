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
        console.log(`Expected Day: ${day}, Month: ${month}, Year: ${year}`)
        this.year = this.page.locator(`//button[contains(@class,'MuiPickersYear') and text()="${year}"]`);
        const label = this.page.locator('.MuiPickersCalendarHeader-label');
        this.previousMonth = this.page.getByLabel('Previous month')
        this.nextMonth = this.page.getByLabel('Next month')
        this.date = this.page.getByRole('gridcell', { name: `${day}` }).first()

        await this.year.click();
        const text = await label.textContent();
        const [currentMonth, currentYear] = text.split(' ')
        console.log("Current Month: "+ currentMonth)
        console.log("Current Year: "+ currentYear)
        const expectedMonth = Number(month)
        const currentMonthNum = this.getMonthNumber(currentMonth)

        const diff = expectedMonth - currentMonthNum
        const absDiff = Math.abs(expectedMonth - currentMonthNum)
        if (diff<0){
            for(let i = 0; i< absDiff;i++){
                await this.previousMonth.click()
            }
        }

        else if(diff>0){
             for(let i = 0; i< absDiff;i++){
                await this.nextMonth.click()
            }
        }

        
        await this.date.click();          

        }     
    
    async waitForDataSuccessfullySavedToast(){
        await this.dataSuccessfullySaved.waitFor({ state: 'visible' });
    }
}

export { HelperBase };