Cypress.Commands.add("login", (username, password) => {
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add("assertErrorMessage", (message) => {
  cy.get(".oxd-input-field-error-message")
    .should("be.visible")
    .and("contain", message);
});

Cypress.Commands.add("assertInvalidCredentials", () => {
  cy.get('div[role="alert"]')
    .should("be.visible")
    .and("contain", "Invalid credentials");
});
