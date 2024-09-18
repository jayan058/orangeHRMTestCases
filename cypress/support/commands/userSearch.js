import { waitForSuggestions } from "../../helperFunctions/searchUser";
import { checkVisibility } from "../../helperFunctions/searchUser";
export let fullName = "";

Cypress.Commands.add("grabTheName", () => {
  cy.get('input[name="firstName"]')
    .invoke("val")
    .then((firstName) => {
      cy.get('input[name="middleName"]')
        .invoke("val")
        .then((middleName) => {
          cy.get('input[name="lastName"]')
            .invoke("val")
            .then((lastName) => {
              fullName = `${firstName.trim()} ${middleName.trim()} ${lastName.trim()}`;
              return fullName;
            });
        });
    });
});

Cypress.Commands.add("typeTheInfo", (userRole, status) => {
  cy.get(".oxd-input--active").last().type(userRole);
  cy.get(".oxd-icon.bi-caret-down-fill.oxd-select-text--arrow").first().click();
  cy.get('div[role="listbox"]').should("be.visible").contains(userRole).click();
  cy.get('input[placeholder="Type for hints..."]').clear().type(fullName);
  waitForSuggestions();
  cy.get(".oxd-icon.bi-caret-down-fill.oxd-select-text--arrow").last().click();
  cy.get('div[role="listbox"]').should("be.visible").contains(status).click();
  cy.get(".oxd-button").eq(1).click();
});

Cypress.Commands.add("countTheNumberOfRecordDisplayed", () => {
  cy.get("span.oxd-text--span")
    .eq(12)
    .invoke("text")
    .then((text) => {
      const recordCount = parseInt(text.match(/\d+/)[0], 10);
      cy.get(".oxd-table-card").should("have.length", recordCount);
    });
});

Cypress.Commands.add("checkIfCorrectInfoIsDisplayed", (name, role, status) => {
  fullName = fullName.split(" ");
  const expectedUsername = name;
  const expectedUserRole = role;
  const expectedEmployeeName = `${fullName[0]} ${fullName[fullName.length - 1]}`;
  const expectedStatus = status;
  checkVisibility();
  cy.get(".oxd-table-row").each(($row) => {
    cy.get(".oxd-table-cell")
      .eq(1)
      .invoke("text")
      .then((username) => {
        username = username.trim();
        cy.get(".oxd-table-cell")
          .eq(2)
          .invoke("text")
          .then((userRole) => {
            userRole = userRole.trim();

            cy.get(".oxd-table-cell")
              .eq(3)
              .invoke("text")
              .then((employeeName) => {
                employeeName = employeeName.trim();

                cy.get(".oxd-table-cell")
                  .eq(4)
                  .invoke("text")
                  .then((status) => {
                    status = status.trim();

                    // Perform assertions here
                    expect(username).to.equal(expectedUsername);
                    expect(userRole).to.equal(expectedUserRole);
                    expect(employeeName).to.equal(expectedEmployeeName);
                    expect(status).to.equal(expectedStatus);
                  });
              });
          });
      });
  });
});
