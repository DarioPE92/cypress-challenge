const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  get inputEmail()        { return cy.get('input[type="email"]'); }
  get inputPassword()     { return cy.get('input[type="password"]'); }
  get btnEntrar()         { return cy.contains('button', 'Entrar'); }
  get tituloLogin()       { return cy.contains('Login'); }
  get alertDismissible()  { return cy.get('.alert-dismissible'); }

  visit() {
    this.visitPath('/login');
  }

  assertPageVisible() {
    this.assertVisible(this.tituloLogin);
  }

  loginWith(email, password) {
    this.visit();
    this.assertPageVisible();
    this.fillField(this.inputEmail, email);
    this.fillField(this.inputPassword, password);
    this.clickElement(this.btnEntrar);
  }
}

module.exports = new LoginPage();
