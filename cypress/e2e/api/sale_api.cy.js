const { API_BASE_URL, requestApi, createUser, loginUser } = require('../../support/api_helpers');

describe('API E2E - Purchase Flow', () => {
  it('should create cart with two products and finish purchase', () => {
    createUser(false).then((createResult) => {
      expect(createResult.response.status).to.equal(201);

      loginUser(createResult).then((loginResult) => {
        expect(loginResult.response.status).to.equal(200);

        requestApi({
          method: 'GET',
          url: `${API_BASE_URL}/produtos`
        }).then((productsResponse) => {
          expect(productsResponse.status).to.equal(200);
          expect(productsResponse.body.produtos).to.have.length.greaterThan(1);

          const firstProduct = productsResponse.body.produtos[0];
          const secondProduct = productsResponse.body.produtos[1];

          requestApi({
            method: 'POST',
            url: `${API_BASE_URL}/carrinhos`,
            headers: { Authorization: loginResult.token },
            body: {
              produtos: [
                { idProduto: firstProduct._id, quantidade: 1 },
                { idProduto: secondProduct._id, quantidade: 1 }
              ]
            }
          }).then((cartResponse) => {
            expect(cartResponse.status).to.equal(201);
            expect(cartResponse.body).to.have.property('_id');

            requestApi({
              method: 'DELETE',
              url: `${API_BASE_URL}/carrinhos/concluir-compra`,
              headers: { Authorization: loginResult.token }
            }).then((finishResponse) => {
              expect(finishResponse.status).to.equal(200);
            });
          });
        });
      });
    });
  });
});
