const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://restapi.adequateshop.com/api",
    supportFile: false,
    setupNodeEvents(on, config) {
    },
  },
});
