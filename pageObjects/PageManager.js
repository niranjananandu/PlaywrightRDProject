import {LoginPage} from './LoginPage.js';
import {UsersPage} from './UsersPage.js';

class PageManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.usersPage = new UsersPage(page);
  }

  createLoginPage() {
    return this.loginPage;
  }

  createUsersPage() {
    return this.usersPage;
  }
}

export {PageManager};