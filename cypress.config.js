const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    baseUrl: "https://front.serverest.dev/",
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    // Timeouts centralizados
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 60000,
  },

  env: {
    allure: true,
    allureResultsPath: 'allure-results',
    allure_results_dir: 'allure-results',
  },
});
