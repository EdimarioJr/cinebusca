describe("auth spec", () => {
  it("Login successfully with a valid account", () => {
    cy.visit("/login");

    cy.getBySel("signin-link").click();

    cy.location("pathname").should("eq", "/login");
    cy.getBySel("email-input").type(Cypress.env("TEST_ACCOUNT_EMAIL"));
    cy.getBySel("password-input").type(Cypress.env("TEST_ACCOUNT_PASSWORD"));
    cy.getBySel("signin-button").click();

    cy.location("pathname").should("eq", "/");

    cy.getBySel("logout-button").click();
  });

  it("Should not create account with existing e-mail", () => {
    cy.visit("/login");

    cy.getBySel("signup-link").click();

    cy.getBySel("name-input").type("edimario");
    cy.getBySel("email-input").type(Cypress.env("TEST_ACCOUNT_EMAIL"));
    cy.getBySel("password-input").type(Cypress.env("TEST_ACCOUNT_PASSWORD"));
    cy.getBySel("confirm-password-input").type("Password errado");

    cy.contains("Passwords don't match").should("be.visible");
    cy.getBySel("confirm-password-input").clear();
    cy.getBySel("confirm-password-input").type(
      Cypress.env("TEST_ACCOUNT_PASSWORD")
    );

    cy.getBySel("signup-button").click();
    cy.get("*[class^='Toastify']")
      .should("be.visible")
      .should("contain", "Error");

    cy.location("pathname").should("eq", "/login");
  });
});
