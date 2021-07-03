describe("Start Screen Test", () => {
  it("can view the start screen", () => {
    cy.visit("/");
    cy.contains("React");
  });
});
