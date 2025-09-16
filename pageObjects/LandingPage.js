import { HelperBase } from './HelperBase';

class LandingPage extends HelperBase{
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
     super(page);
    if (!page) {  
      throw new Error('Page object is not initialized');
    }
    
    this.toggleDrawerButton = page.getByRole('button', { name: 'Toggle Drawer' });
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
  }

  async openDrawer() {
    await this.toggleDrawerButton.click();
  }

  async goToDashboard() {
    await this.dashboardLink.click();
  }
}
 
export {LandingPage}