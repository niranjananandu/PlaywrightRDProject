import { HelperBase } from './HelperBase';

class UsersPage extends HelperBase {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    if (!page) {  
      throw new Error('Page object is not initialized');
    }
    this.logo = page.getByRole('img', { name: 'Logo' });
    this.addUserButton = page.getByRole('button', { name: 'Add User' });
    this.saveChangesButton = page.getByRole('button', { name: 'Save Changes' });
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.titleInput = page.getByLabel('Title');
    this.firstNameInput = page.getByLabel('First Name');
    this.lastNameInput = page.getByLabel('Last Name');
    this.emailInput = page.getByLabel('Email');
    this.systemRole = page.locator('div[data-testid="user-role-id-field"]');
    this.toastMessage = page.getByText('Your data has been successfully saved');
    this.menu = page.locator('#menu-')
    this.userTableRow = page.locator('//tr[contains(@data-testid,"user-table-row")]');
    this.affiliationsTab =  page.getByTestId('user-panel-tab-tab-item-affiliations')
    this.addAffiliation =  page.getByTestId('add-affiliation-button-icon')
    this.affiliationsDropdown = page.getByRole('combobox', { name: 'Affiliation' })
    this.affiliationsOption = page.getByLabel('APEGA')
    this.membershipNumberInput = page.getByRole('textbox', { name: 'Membership Number' })
    this.yearJoinedInput = page.getByRole('textbox', { name: 'Year Joined' })
    this.expiryDateInput = page.getByRole('textbox', { name: 'Expiry Date' }) 
    this.primaryAffiliationCheckbox = page.getByRole('checkbox', { name: 'Primary Affiliation' })
  }

   getSystemRoleField(text) {
  return this.page.locator(`li[role="option"]:has-text("${text}")`);
}

  getUserInGridName(text) {
    return `tbody[data-testid="common-table-body"] tr:first-child td:nth-child(5):has-text("${text}")`;
  } 

  getAffiliationsOption(option){
    return this.page.getByLabel(option)
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
        await this.systemRole.click();
        try{
                 await this.getSystemRoleField(role).click();
        } catch (error) {
            await this.menu.click();          
        }
    
    }

    async submitForm() {
        await this.page.click(this.formDialogSubmitButton);
    }

    async getErrorMessage() {
        return await this.page.textContent(this.errorMessage);
    }
  
  async searchUser(username) {
    await this.searchInput.fill(username);  
  }

  async fillUserForm(user) {
    await this.fillTitle(user.title);
    await this.fillFirstName(user.firstName);
    await this.fillLastName(user.lastName);
    await this.fillEmail(user.email);
    await this.selectSystemRole(user.role);
  }

  async isUserInGrid(username) {
    const userInGridName = this.getUserInGridName(username);
    const cell = await this.page.waitForSelector(userInGridName);
    const cellText = await cell.textContent();
    return cellText.trim();
 }

 async clickUserTableRow() {
  await this.userTableRow.click();

 }

 async clickAffiliationsTab(){
  await this.affiliationsTab.click()
 }

 async clickAddAffilationsButton(){
  await this.addAffiliation.click()
 }

  async fillAffiliations(affiliation){    
    await this.affiliationsDropdown.click()
    await this.getAffiliationsOption(affiliation.affiliationName).click()
    await this.membershipNumberInput.fill(affiliation.membershipNumber)
    await this.yearJoinedInput.fill(affiliation.yearJoined)
    await this.expiryDateInput.fill(affiliation.expiryDate)
    if(affiliation.primaryAffiliation){
        await this.primaryAffiliationsToggle()
    }         
    await this.submitForm()
    }


  async primaryAffiliationsToggle(){
       await this.primaryAffiliationCheckbox.click()

  }
   
 }

export { UsersPage };
