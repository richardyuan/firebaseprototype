import { browser, by, element, ExpectedConditions } from 'protractor';
import { PageObjectBase } from './PageObjectBase';

export class DashboardPageTest extends PageObjectBase {
  constructor() {
    super('app-dashboard', '/dashboard');
  }

  waitForError() {
    browser.wait(
      ExpectedConditions.presenceOf(element(by.css('.error'))),
      3000
    );
  }

  getErrorMessage() {
    return element(by.css('.error')).getText();
  }

  enterEmail(email: string) {
    this.enterInputText('.email', email);
  }

  enterPassword(password: string) {
    this.enterInputText('.password', password);
  }

  // clickRetrieveSwimlanes() {
  //   this.clickButton('.retrieveSwimlanes');
  // }

  clickOnButton(buttonName: string) {
    this.clickButton(buttonName);
  }
}