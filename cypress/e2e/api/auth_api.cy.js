const { API_BASE_URL, requestApi, createUser, loginUser } = require('../../support/api_helpers');

describe('API E2E - Registration and Authentication', () => {
  it('should register user and authenticate successfully via API', () => {
    createUser(false).then((createResult) => {
      expect(createResult.response.status).to.equal(201);
      expect(createResult.response.body).to.have.property('_id');

      loginUser(createResult).then((loginResult) => {
        expect(loginResult.response.status).to.equal(200);
        expect(loginResult.token).to.be.a('string').and.not.be.empty;
      });
    });
  });
});
