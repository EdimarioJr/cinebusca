describe("watchlist spec", () => {
  before(() => {
    cy.signIn();
  });

  it("Should CRUD watchlist", () => {
    cy.visit("/movie/798286", { timeout: 600000 });
    cy.location("pathname", { timeout: 50000 }).should("eq", "/movie/798286");
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
