import { checkVisibility } from "../helperFunctions/searchUser";

describe("User search page", () => {
  beforeEach(() => {
    cy.visit("/web/index.php/auth/login");
    cy.fixture("users").then((users) => {
      cy.login(users.validUser.username, users.validUser.password);
    });
    cy.visit("/web/index.php/admin/viewSystemUsers");
  });

  it("should display all form elements for searching the user", () => {
    cy.get(".oxd-input--active").last().should("be.visible");
    cy.get(".oxd-select-text--active").should("be.visible");
    cy.get('input[placeholder="Type for hints..."]').should("be.visible");
    cy.get(".oxd-select-text--active").should("be.visible");
    cy.get(".oxd-button").eq(0).should("be.visible").click();
    cy.get(".oxd-button").eq(1).should("be.visible");
  });

  it("should submit the form with all the data entered by the admin while searching for the user", () => {
    cy.get("a.oxd-main-menu-item").eq(5).click();
    checkVisibility();
    cy.grabTheName();
    cy.visit("/web/index.php/admin/viewSystemUsers");
    cy.typeTheInfo("Admin", "Enabled");
  });

  it("should display the correct count for the number of result displayed after searching", () => {
    cy.get("a.oxd-main-menu-item").eq(5).click();
    checkVisibility();
    cy.grabTheName();
    cy.visit("/web/index.php/admin/viewSystemUsers");
    cy.typeTheInfo("Admin", "Enabled");
    cy.countTheNumberOfRecordDisplayed();
  });

  it("should display the correct message if there are no records found that belong to the information provided", () => {
    cy.get("a.oxd-main-menu-item").eq(5).click();
    checkVisibility();
    cy.grabTheName();
    cy.visit("/web/index.php/admin/viewSystemUsers");
    cy.typeTheInfo("ESS", "Disabled");
    cy.get(".oxd-toast-content-text").should("be.visible");
  });

  it("the correct record should be displayed", () => {
    cy.get("a.oxd-main-menu-item").eq(5).click();
    checkVisibility();
    cy.grabTheName();
    cy.visit("/web/index.php/admin/viewSystemUsers");
    cy.typeTheInfo("Admin", "Enabled");
    cy.checkIfCorrectInfoIsDisplayed("Admin", "Admin", "Enabled");
  });
});
