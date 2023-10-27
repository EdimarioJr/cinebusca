describe("review spec", () => {
  before(() => {
    cy.signIn();
    cy.visit("/movie/798286");
  });

  it("Should CRUD review", () => {
    cy.location("pathname", { timeout: 5000 }).should("eq", "/movie/798286");
    cy.getBySel("review-button").click();
    cy.getBySel("review-input").invoke("val", "");
    cy.getBySel("review-input").type("Filme muito louco!");
    cy.getBySel("create-review-button").click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100);
    cy.getBySel("my-reviews-link").click();

    cy.location("pathname").should("eq", "/reviews");

    cy.getBySel("review-card-text").contains("Filme muito louco!");

    cy.getBySel("review-card")
      .contains("Filme muito louco!")
      .parent()
      .find("[data-test=edit-review-button]")
      .click();

    cy.getBySel("review-input").invoke("val", "");
    cy.getBySel("review-input").type("Filme muito louco editado!");
    cy.getBySel("create-review-button").click();

    cy.getBySel("close-modal-button").click();

    cy.getBySel("review-card-text").contains("Filme muito louco editado!");

    cy.getBySel("review-card")
      .contains("Filme muito louco editado!")
      .parent()
      .find("[data-test=delete-review-button]")
      .click();

    cy.getBySel("review-card-text")
      .contains("Filme muito louco")
      .should("not.exist");
  });
});
