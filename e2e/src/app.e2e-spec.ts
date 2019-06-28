import { LoginPageTest } from "./LoginPageTest";
import { browser } from 'protractor';
import { DashboardPageTest } from './DashboardPageTest';
import { RegisterPageTest } from './RegisterPageTest';

describe('Application:', () => {
  const loginPage: LoginPageTest = new LoginPageTest();
  const dashboardPage: DashboardPageTest = new DashboardPageTest();
  const registerPage: RegisterPageTest = new RegisterPageTest();

  it('should register', () => {
    registerPage.load();
    registerPage.waitUntilVisible();
    registerPage.enterEmail('test@test.com');
    registerPage.enterPassword('password123');
    registerPage.clickOnButton('.submit-btn');
    registerPage.clickOnButton('.loginpage');
  });

  it('should login, retrieve data and visualise it from Firebase', () => {
    loginPage.load();
    loginPage.enterEmail('test@test.com');
    loginPage.enterPassword('password123');
    loginPage.clickOnButton('.submit-btn');
  });

  it('should retrieve and visualise data from Firebase', () => {
    dashboardPage.waitUntilVisible();
    browser.sleep(1000);
    dashboardPage.clickOnButton('.retrieveSwimtimes');
    browser.sleep(1000);
    dashboardPage.clickOnButton('.visualiseSwimtimes');
    browser.sleep(1000);
  });

});