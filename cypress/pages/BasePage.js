class BasePage {

  get logoutButton() { return cy.get('[data-testid="logout"]'); }
    
  visitPath(path) {
    cy.visit(path);
  }

  clickElement(element) {
    element.should('be.visible').click();
  }

  fillField(element, value) {
    element.should('be.visible').clear().type(value, { delay: 0 });
  }

  assertVisible(element, timeout) {
    if (typeof timeout === 'number') {
      element.should('be.visible', { timeout });
      return;
    }

    element.should('be.visible');
  }

  assertUrlIncludes(path) {
    cy.url().should('include', path);
  }
}

module.exports = BasePage;
