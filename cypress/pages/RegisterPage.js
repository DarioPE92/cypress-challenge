const BasePage = require('./BasePage');

class RegisterPage extends BasePage {

  get linkCadastreSe() { return cy.contains('a', 'Cadastre-se'); }
  get inputNome()      { return cy.get('input[name="nome"]'); }
  get inputEmail()     { return cy.get('input[name="email"]'); }
  get inputPassword()  { return cy.get('input[name="password"]'); }
  get checkboxAdmin()  { return cy.get('input[type="checkbox"]'); }
  get btnCadastrar()   { return cy.contains('button', 'Cadastrar'); }
  get tituloCadastro() { return cy.contains('Cadastro'); }
  get alertLink()      { return cy.get('.alert-link'); }

  visit() {
    this.visitPath('/login');
  }

  assertPageVisible() {
    this.assertVisible(this.tituloCadastro);
  }

  openRegistrationForm() {
    this.visit();
    this.clickElement(this.linkCadastreSe);
    this.assertPageVisible();
  }

  fillRegistrationForm(userData) {
    this.fillField(this.inputNome, userData.name);
    this.fillField(this.inputEmail, userData.email);
    this.fillField(this.inputPassword, userData.password);
  }

  submitRegistration(isAdmin = false) {
    if (isAdmin) {
      this.checkboxAdmin.check({ force: true });
    }

    this.clickElement(this.btnCadastrar);
    this.assertVisible(this.alertLink, 60000);
  }

  registerUser(userData, isAdmin = false) {
    this.openRegistrationForm();
    this.fillRegistrationForm(userData);
    this.submitRegistration(isAdmin);
  }
}

module.exports = new RegisterPage();
module.exports.RegisterPage = RegisterPage;
