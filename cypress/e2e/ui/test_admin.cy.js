const adminRegisterUsersPage = require('../../pages/AdminRegisterUsersPage');
const adminHomePage = require('../../pages/AdminHomePage');
const registerPage = require('../../pages/RegisterPage');
const { generateRandomUser } = require('../../utils/generators');

describe('UI E2E - User Administration', () => {
  let user;
  let admin;

  it('should register admin user and validate in users list', () => {
    admin = generateRandomUser();
    user = generateRandomUser();

    registerPage.registerUser(admin, true);

    adminHomePage.assertPageVisible();
    adminHomePage.clickElement(adminHomePage.cadastrarUsuarioBtn);
    adminRegisterUsersPage.registerUser(user);
    adminRegisterUsersPage.assertUserInTable(user.name, false);
    adminRegisterUsersPage.deleteUserInTable(user.name, false);
    cy.reload();
    adminRegisterUsersPage.assertUserNotInTable(user.name, false);

  });

});
