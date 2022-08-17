const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://sandbox-api.getkevin.eu/platform/v0.3',
    baseUrlUi: 'https://www.kevin.eu',
    demoUrl2: 'https://demo.kevin.eu/',
    viewportWidth: 1536,
    viewportHeight: 960,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
