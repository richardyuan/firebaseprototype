import { LoginPageTest } from "./LoginPageTest";
import { browser, by, element, Ptor } from 'protractor';


describe('new App', () => {
  let page: LoginPageTest = new LoginPageTest()

  beforeEach(() => {
    page.load();
  });

  it('should login', () => {
    //page.enterEMail('a@live.com');
    // var email = Ptor.findElement(protractor.By.model('email'));
    // var password = Ptor.findElement(protractor.By.model('password'));
    page.enterEMail('a@live.com');
    
  })

});
