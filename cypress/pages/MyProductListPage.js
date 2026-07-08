const BasePage = require('./BasePage');

class MyProductListPage extends BasePage {
  get productsSection() { return cy.get('section.row.espacamento'); }
  get adicionarCarrinho()   { return cy.get('[data-testid="adicionar carrinho"]'); }
  get shoppingListProductName() { return cy.get('[data-testid="shopping-cart-product-name"]'); }

  visit() {
    this.visitPath('/minhaListaDeProdutos');
  }

  assertPageVisible() {
    this.assertUrlIncludes('/minhaListaDeProdutos');
    this.assertVisible(this.adicionarCarrinho);
  }

  assertListProductName(expectedProductName) {
    cy.contains('[data-testid="shopping-cart-product-name"]', expectedProductName, { timeout: 30000 })
      .should('be.visible')
      .and('contain.text', expectedProductName);
  }

}

module.exports = new MyProductListPage();
