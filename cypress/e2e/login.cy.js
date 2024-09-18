describe("OrangeHRM Login Tests", () => {
  beforeEach(() => {
    cy.visit("/web/index.php/auth/login");
  });

  context("Login Form Elements", () => {
    it("should display login form elements", () => {
      cy.get('input[name="username"]').should("be.visible");
      cy.get('input[name="password"]').should("be.visible");
      cy.get('button[type="submit"]').should("be.visible");
    });
  });

  context("Login Scenarios", () => {
    it("should login successfully with valid credentials", () => {
      cy.fixture("users").then((users) => {
        cy.login(users.validUser.username, users.validUser.password);
        cy.url().should("include", "/dashboard");
        cy.get('img[alt="profile picture"]').should("be.visible");
      });
    });

    it("should fail to login with invalid credentials", () => {
      cy.fixture("users").then((users) => {
        cy.login(users.invalidUser.username, users.invalidUser.password);
        cy.assertInvalidCredentials();
      });
    });

    it("should fail to login with empty username and password", () => {
      cy.get('button[type="submit"]').click();
      cy.assertErrorMessage("Required");
    });

    it("should fail to login with only username filled", () => {
      cy.fixture("users").then((users) => {
        cy.get('input[name="username"]').type(users.validUser.username);
        cy.get('button[type="submit"]').click();
        cy.assertErrorMessage("Required");
      });
    });

    it("should fail to login with only password filled", () => {
      cy.fixture("users").then((users) => {
        cy.get('input[name="password"]').type(users.validUser.password);
        cy.get('button[type="submit"]').click();
        cy.assertErrorMessage("Required");
      });
    });

    it("should fail to login with a very long username and password", () => {
      const longText = "a".repeat(100);
      cy.login(longText, longText);
      cy.assertInvalidCredentials();
    });

    it("should fail to login with special characters in username and password", () => {
      const specialCharText = "!@#$%^&*()";
      cy.login(specialCharText, specialCharText);
      cy.assertInvalidCredentials();
    });
  });
});
