describe("watchlist spec", () => {
  before(() => {
    cy.signIn("/movie/798286");
  });

  it("Should CRUD watchlist", () => {
    cy.location("pathname").should("eq", "/movie/798286");
    cy.getBySel("watchlist-button").click();
    cy.contains("Remove from Watchlist").should("exist");
    cy.getBySel("watchlist-button").click();
    cy.contains("Add to your Watchlist").should("exist");
    cy.getBySel("watchlist-button").click();

    cy.getBySel("watchlist-link").click();
    cy.location("pathname").should("eq", "/watchlist");
    cy.contains("My watchlists").should("exist");
    cy.contains("Beau").should("exist");
    cy.contains("Beau")
      .parent()
      .find("[data-test=remove-watchlist-button]")
      .click();
    cy.contains("Beau").should("not.exist");
  });
});
