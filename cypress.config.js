const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    pageLoadTimeout: 60000,
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
