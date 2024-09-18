describe("Side panel search", () => {
  beforeEach(() => {
    cy.visit("/web/index.php/auth/login");
    cy.fixture("users").then((users) => {
      cy.login(users.validUser.username, users.validUser.password);
    });
    cy.visit("/web/index.php/admin/viewSystemUsers");
  });

  it("should display all the elements for searching the in the sidePanel  ", () => {
    cy.get('input[placeholder="Search"]').should("be.visible");
    cy.get(".oxd-sidepanel-body").should("be.visible");
    cy.get(".oxd-main-menu-item").should("be.visible");
  });

  it("should correctly display the element that is searched while searching in the search panel and valid input is provided  ", () => {
    cy.searchSidePanel("PIM");
    cy.validateSearchResult("PIM");
  });

  it("should h=not display any result when invalid query is provided", () => {
    cy.searchSidePanel("Invalid");
    cy.get(".oxd-main-menu-item").should("not.exist");
  });
});
