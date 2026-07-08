const { generateRandomUser } = require('../utils/generators');

const API_BASE_URL = 'https://serverest.dev';

function requestApi(options) {
  return cy.request({ failOnStatusCode: false, ...options });
}

function createUser(isAdmin = false) {
  const user = generateRandomUser();
  const body = {
    nome: user.name,
    email: user.email,
    password: user.password,
    administrador: isAdmin ? 'true' : 'false'
  };

  return requestApi({
    method: 'POST',
    url: `${API_BASE_URL}/usuarios`,
    body
  }).then((response) => ({
    ...body,
    id: response.body._id,
    response
  }));
}

function loginUser(user) {
  return requestApi({
    method: 'POST',
    url: `${API_BASE_URL}/login`,
    body: {
      email: user.email,
      password: user.password
    }
  }).then((response) => ({
    token: response.body.authorization,
    response
  }));
}

module.exports = {
  API_BASE_URL,
  requestApi,
  createUser,
  loginUser
};
