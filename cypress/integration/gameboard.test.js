describe("Gameboard test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Start").click();
  });

  it("appears after pressing start on start screen", () => {
    cy.get("div.Gameboard");
  });

  it("has 100 squares when on easy difficulty", () => {
    cy.get("div.Gameboard").find("div.square").should("have.length", 100);
  });
});
