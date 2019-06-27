import { LoginPageTest } from "./LoginPageTest";
import { browser } from 'protractor';
import { DashboardPageTest } from './DashboardPageTest';
import { protractor } from 'protractor/built/ptor';
import { RegisterPageTest } from './RegisterPageTest';

describe('new App', () => {
  const loginPage: LoginPageTest = new LoginPageTest();
  const dashboardPage: DashboardPageTest = new DashboardPageTest();

  beforeEach(() => {
    loginPage.load();
  });

  it('should login, retrieve data and visualise it from Firebase', () => {
    loginPage.enterEmail('a@live.com');
    loginPage.enterPassword('password123');
    loginPage.clickOnButton('.submit-btn');
    dashboardPage.waitUntilVisible();
    dashboardPage.clickOnButton('.retrieveSwimtimes');
    browser.sleep(1000);
    dashboardPage.clickOnButton('.visualiseSwimtimes');
    browser.sleep(1000);
  });

});

// describe('create new Acc', () => {
//   const loginPage: LoginPageTest = new LoginPageTest();
//   const dashboardPage: DashboardPageTest = new DashboardPageTest();
//   const registerPage: RegisterPageTest = new RegisterPageTest();

//   beforeEach(() => {
//     loginPage.load();
//   });

//   it('should register', () => {
//     loginPage.clickOnButton('.register');
//     registerPage.waitUntilVisible();
//     registerPage.enterEmail('test@test.com');
//     //registerPage.enterPassword('password123');
//     registerPage.clickOnButton('.submit-btn');
//     browser.sleep(1000);
//     // dashboardPage.clickOnButton('.retrieveSwimtimes');
//     // browser.sleep(1000);
//     // dashboardPage.clickOnButton('.visualiseSwimtimes');
//     // browser.sleep(1000);
//   });

