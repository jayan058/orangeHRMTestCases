describe("Side panel search", () => {
  beforeEach(() => {
    cy.visit("/web/index.php/auth/login");
    cy.fixture("users").then((users) => {
      cy.login(users.validUser.username, users.validUser.password);
    });
    cy.visit("/web/index.php/admin/viewSystemUsers");
  });

  it.skip("should delete the checked user if the user is not admin", () => {
    cy.deleteNonAdminUser();
  });
  it("should not delete the if the user is  admin", () => {
    cy.deleteAdminUser();
  });
});
