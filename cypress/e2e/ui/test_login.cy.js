const homePage = require('../../pages/HomePage');
const loginPage = require('../../pages/LoginPage');
const registerPage = require('../../pages/RegisterPage');
const { generateRandomUser } = require('../../utils/generators');

describe('UI E2E - Registration and Authentication', () => {
  let user;

  it('should register user and authenticate successfully via UI', () => {
    user = generateRandomUser();
    registerPage.registerUser(user);

    homePage.assertPageVisible();
    homePage.clickElement(homePage.logoutButton);

    loginPage.assertPageVisible();
    loginPage.loginWith(user.email, user.password);

    homePage.assertPageVisible();
    homePage.clickElement(homePage.logoutButton);
    loginPage.assertPageVisible();
  });
});