const registerPageModule = require('./RegisterPage');
const RegisterPage = registerPageModule.RegisterPage;

class AdminRegisterUsersPage extends RegisterPage {

  get userTableRows() { return cy.get('table.table-striped tbody tr'); }

  findUserRow(expectedName, expectedIsAdmin) {
    const expectedAdminText = expectedIsAdmin ? 'true' : 'false';

    return this.userTableRows.then(($rows) => {
      const matchedRow = [...$rows].find(($row) => {
        const cols = $row.querySelectorAll('td');
        const name = cols[0]?.textContent.trim();
        const admin = cols[3]?.textContent.trim();
        return name === expectedName && admin === expectedAdminText;
      });

      return { matchedRow, expectedAdminText };
    });
  }

  assertUserInTable(expectedName, expectedIsAdmin) {
    this.findUserRow(expectedName, expectedIsAdmin).then(({ matchedRow, expectedAdminText }) => {
      expect(!!matchedRow, `Usuario "${expectedName}" com admin=${expectedAdminText} na tabela`).to.be.true;
    });
  }

  assertUserNotInTable(expectedName, expectedIsAdmin) {
    this.findUserRow(expectedName, expectedIsAdmin).then(({ matchedRow, expectedAdminText }) => {
      expect(!!matchedRow, `Usuario "${expectedName}" com admin=${expectedAdminText} nao deve existir na tabela`).to.be.false;
    });
  }

  deleteUserInTable(expectedName, expectedIsAdmin) {
    this.findUserRow(expectedName, expectedIsAdmin).then(({ matchedRow, expectedAdminText }) => {
      expect(!!matchedRow, `Usuario "${expectedName}" com admin=${expectedAdminText} na tabela`).to.be.true;

      if (matchedRow) {
        cy.wrap(matchedRow).contains('button', 'Excluir').click();
      }
    });
  }

    submitRegistration(isAdmin = false) {
    if (isAdmin) {
      this.checkboxAdmin.check({ force: true });
    }

    this.clickElement(this.btnCadastrar);
  }

   registerUser(userData, isAdmin = false) {
    this.fillRegistrationForm(userData);
    this.submitRegistration(isAdmin);
  }
}

module.exports = new AdminRegisterUsersPage();
