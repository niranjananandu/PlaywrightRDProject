import { LandingPage } from './LandingPage.js';
import {LoginPage} from './LoginPage.js';
import {UsersPage} from './UsersPage.js';

class PageManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.usersPage = new UsersPage(page);
    this.landingPage =  new LandingPage(page);
  }

  createLoginPage() {
    return this.loginPage;
  }

  createUsersPage() {
    return this.usersPage;
  }

  createLandingPage(){
    return this.landingPage;
  }
}

export {PageManager};