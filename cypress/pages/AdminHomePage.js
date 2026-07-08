const BasePage = require('./BasePage');

class AdminPage extends BasePage {
  get msgBoasVindas()        { return cy.get('.jumbotron h1'); }
  get cadastrarUsuarioBtn()  { return cy.get('[data-testid="cadastrarUsuarios"]'); }

  visit() {
    this.visitPath('/admin/home');
  }

  assertPageVisible() {
    this.assertVisible(this.msgBoasVindas, 6000);
  }

}

module.exports = new AdminPage();
