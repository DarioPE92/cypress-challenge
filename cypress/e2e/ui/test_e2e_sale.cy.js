const homePage = require('../../pages/HomePage');
const myProductListPage = require('../../pages/MyProductListPage');
const cartPage = require('../../pages/CartPage');
const registerPage = require('../../pages/RegisterPage');
const { generateRandomUser } = require('../../utils/generators');

describe('UI E2E - Purchase Flow', () => {
  let user;

  it('should register user, add two products and finish with logout', () => {
    const firstProduct = 'Logitech MX Vertical';
    const secondProduct = 'Samsung 60 polegadas';

    user = generateRandomUser();
    registerPage.registerUser(user);

    homePage.assertPageVisible();
    homePage.addProductByName(firstProduct);
    homePage.goToHomeAndWaitProducts();
    homePage.addProductBySearch(secondProduct);

    myProductListPage.assertPageVisible();
    myProductListPage.assertListProductName(firstProduct);
    myProductListPage.assertListProductName(secondProduct);
    myProductListPage.clickElement(myProductListPage.adicionarCarrinho);

    cartPage.assertLogoutVisible();
    cartPage.clickElement(cartPage.logoutButton);

  });
});
