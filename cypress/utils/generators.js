function generateRandomUser() {
  const randomNumber = Math.floor(Math.random() * 100000);
  const firstName = 'Usuario';
  const lastName = 'Cypress';
  const fullName = `${firstName} ${lastName} ${randomNumber}`;
  const email = `cypress${randomNumber}@qa.com`;

  return {
    name: fullName,
    email,
    password: '123456'
  };
}

module.exports = {
  generateRandomUser
};
