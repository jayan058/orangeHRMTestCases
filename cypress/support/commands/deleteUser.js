import { checkVisibility } from "../../helperFunctions/searchUser";
Cypress.Commands.add("deleteNonAdminUser", () => {
  let isDeleted = false;
  checkVisibility();
  cy.get('div[role="row"]').then((rows) => {
    if (rows.length == 2) {
      return false;
    } else {
      cy.get('div[role="row"]').each(($rows, index) => {
        if (index === 0 || isDeleted) {
          return;
        }
        cy.wrap($rows)
          .find(".oxd-table-cell")
          .eq(1)
          .then(($cell) => {
            if ($cell.text().trim() !== "Admin") {
              cy.wrap($rows).find(".oxd-table-cell").eq(0).click();
            } else {
              return false;
            }
          });
      });
      cy.get(".bi-trash-fill").click();
      cy.get(".oxd-button--label-danger").last().click();
      checkVisibility();
    }
  });
});

Cypress.Commands.add("deleteAdminUser", () => {
  cy.get('div[role="row"]').each(($row, index) => {
    if (index == 0) {
      return;
    }

    cy.wrap($row)
      .find(".oxd-table-cell")
      .eq(1)
      .then(($cell) => {
        if ($cell.text().trim() == "Admin") {
          cy.wrap($row)
            .find(".oxd-table-cell")
            .eq(5)
            .then(($actions) => {
              cy.wrap($actions).find(".oxd-icon-button").first().click();
              cy.get(".oxd-toast--error").should("be.visible");
            });
        }
      });
  });
});
