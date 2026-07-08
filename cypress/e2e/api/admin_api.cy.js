const { API_BASE_URL, requestApi, createUser, loginUser } = require('../../support/api_helpers');

describe('API E2E - User Administration', () => {
  it('should register admin, validate user in list, delete and validate absence', () => {
    createUser(true).then((adminResult) => {
      expect(adminResult.response.status).to.equal(201);

      loginUser(adminResult).then((adminLoginResult) => {
        expect(adminLoginResult.response.status).to.equal(200);

        createUser(false).then((userResult) => {
          expect(userResult.response.status).to.equal(201);

          requestApi({
            method: 'GET',
            url: `${API_BASE_URL}/usuarios`
          }).then((listResponse) => {
            expect(listResponse.status).to.equal(200);

            const foundUser = listResponse.body.usuarios.find((item) => item._id === userResult.id);
            expect(foundUser, `User ${userResult.nome} should exist in the list`).to.not.be.undefined;
            expect(foundUser.administrador).to.equal('false');

            requestApi({
              method: 'DELETE',
              url: `${API_BASE_URL}/usuarios/${userResult.id}`
            }).then((deleteResponse) => {
              expect(deleteResponse.status).to.equal(200);

              requestApi({
                method: 'GET',
                url: `${API_BASE_URL}/usuarios/${userResult.id}`
              }).then((getDeletedResponse) => {
                expect(getDeletedResponse.status).to.equal(400);
              });
            });
          });
        });
      });
    });
  });
});
