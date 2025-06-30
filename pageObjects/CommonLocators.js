class CommonLocators{

    constructor(page) {
    this.page = page

    this.formDialogSubmitButton = page.locator('//button[@data-testid="form-dialog-submit-btn"]')
    this.formDialogCancelButton = page.locator('//button[@data-testid="form-dialog-cancel-btn"]')
    }

}

export {CommonLocators}