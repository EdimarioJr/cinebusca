describe("review spec", () => {
  before(() => {
    cy.signIn();
  });

  it("Should CRUD review", () => {
    cy.visit("/movie/798286");
    cy.getBySel("review-button").click();
    cy.getBySel("review-input").clear();
    cy.getBySel("review-input").type("Filme muito louco!");
    cy.getBySel("create-review-button").click();

    cy.getBySel("my-reviews-link").click({ force: true });

    cy.location("pathname").should("eq", "/reviews");

    cy.getBySel("review-card-text").contains("Filme muito louco!");

    cy.getBySel("review-card")
      .contains("Filme muito louco!")
      .parent()
      .find("[data-test=edit-review-button]")
      .click();

    cy.getBySel("review-input").clear();
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
