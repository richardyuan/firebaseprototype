import { LoginPageTest } from "./LoginPageTest";
import { browser } from 'protractor';
import { DashboardPageTest } from './DashboardPageTest';
import { protractor } from 'protractor/built/ptor';

describe('new App', () => {
  const logintest: LoginPageTest = new LoginPageTest();
  const dashboardPage: DashboardPageTest = new DashboardPageTest();

  beforeEach(() => {
    logintest.load();
  });

  it('should login, retrieve data and visualise it from Firebase', () => {
    logintest.enterEmail('a@live.com');
    logintest.enterPassword('password123');
    logintest.clickSignIn();
    dashboardPage.waitUntilVisible();
    dashboardPage.clickOnButton('.retrieveSwimtimes');
    browser.sleep(1000);
    dashboardPage.clickOnButton('.visualiseSwimtimes');
    browser.sleep(1000);
  });

});
