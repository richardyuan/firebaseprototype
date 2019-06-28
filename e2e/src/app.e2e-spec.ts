import { LoginPageTest } from "./LoginPageTest";
import { browser } from 'protractor';
import { DashboardPageTest } from './DashboardPageTest';
import { protractor } from 'protractor/built/ptor';
import { RegisterPageTest } from './RegisterPageTest';

describe('Account:', () => {
  const loginPage: LoginPageTest = new LoginPageTest();
  const dashboardPage: DashboardPageTest = new DashboardPageTest();
  const registerPage: RegisterPageTest = new RegisterPageTest();

  // beforeEach(() => {
  //   loginPage.load();
  // });

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
    dashboardPage.waitUntilVisible();
    browser.sleep(1000);
    dashboardPage.clickOnButton('.retrieveSwimtimes');
    browser.sleep(1000);
    dashboardPage.clickOnButton('.visualiseSwimtimes');
    browser.sleep(1000);
  });

  it('should retrieve and visualise data', () => {
    dashboardPage.waitUntilVisible();
    browser.sleep(1000);
    dashboardPage.clickOnButton('.retrieveSwimtimes');
    browser.sleep(1000);
    dashboardPage.clickOnButton('.visualiseSwimtimes');
    browser.sleep(1000);
  });

});

// describe('Add data', () => {
//   const loginPage: LoginPageTest = new LoginPageTest();
//   const dashboardPage: DashboardPageTest = new DashboardPageTest();

//   beforeEach(() => {
//     loginPage.load();
//   });

//   it('should add data to Cloud Firestore and visualise', () => {
//     loginPage.enterEmail('test@test.com');
//     loginPage.enterPassword('password123');
//     loginPage.clickOnButton('.submit-btn');
//     dashboardPage.waitUntilVisible();
//     dashboardPage.clickOnButton('.sync');
//     dashboardPage.clickOnButton('.retrieveSwimtimes');
//     browser.sleep(500);
//     dashboardPage.clickOnButton('.visualiseSwimtimes');
//     browser.sleep(1000);
//   });

// //   it('should login', () => {
// //     loginPage.load();
// //     loginPage.waitUntilVisible();
// //     loginPage.enterEmail('test@test.com');
// //     loginPage.enterPassword('password123');
// //     loginPage.clickOnButton('.submit-btn');
// //     dashboardPage.waitUntilVisible();
// //     dashboardPage.clickOnButton('.retrieveSwimlanes');
// //     dashboardPage.clickOnButton('.visualiseSwimlanes');
// //   });

// })
