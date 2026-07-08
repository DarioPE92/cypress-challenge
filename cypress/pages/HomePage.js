const BasePage = require('./BasePage');

class HomePage extends BasePage {
  get homeLink()       { return cy.get('[data-testid="home"]'); }
  get btnAdicionar()   { return cy.get('[data-testid="adicionarNaLista"]').first(); }
  get inputPesquisar() { return cy.get('[data-testid="pesquisar"]'); }
  get productCards()   { return cy.get('section.row.espacamento .card.col-3'); }
  
  visit() {
    this.visitPath('/home');
  }

  assertPageVisible() {
    this.assertUrlIncludes('/home');
    this.assertVisible(this.btnAdicionar);
  }

  goToHomeAndWaitProducts() {
    this.clickElement(this.homeLink);
    this.productCards.should('have.length.gt', 0);
    this.assertVisible(this.btnAdicionar);
  }

  addProductByName(itemText) {
    this.productCards.should('have.length.gt', 0);

    cy.contains('.card-title', itemText)
      .should('be.visible')
      .closest('.card.col-3')
      .find('[data-testid="adicionarNaLista"]')
      .first()
      .should('be.visible')
      .click();
  }

  addProductBySearch(itemText) {
    this.inputPesquisar.should('be.visible').clear().type(itemText);

    cy.contains('.card-title', itemText, { timeout: 30000 })
      .should('be.visible')
      .closest('.card.col-3')
      .find('[data-testid="adicionarNaLista"]')
      .first()
      .should('be.visible')
      .click();
  }
}

module.exports = new HomePage();
