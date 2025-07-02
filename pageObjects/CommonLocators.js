class CommonLocators{

    constructor(page) {
    this.page = page

    this.formDialogSubmitButton = page.locator('//button[@data-testid="form-dialog-submit-btn"]')
    this.formDialogCancelButton = page.locator('//button[@data-testid="form-dialog-cancel-btn"]')
    this.dataSuccessfullySaved = page.locator('//div[text()="Your data has been successfully saved"]')
    }

}

export {CommonLocators}