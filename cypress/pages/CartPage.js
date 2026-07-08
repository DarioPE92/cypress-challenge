const BasePage = require('./BasePage');

class CartPage extends BasePage {
  
  assertLogoutVisible() {
    this.assertVisible(this.logoutButton);
  }
}

module.exports = new CartPage();
