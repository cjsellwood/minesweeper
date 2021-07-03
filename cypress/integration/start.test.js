describe("Start Screen Test", () => {
  it("can view the start screen", () => {
    cy.visit("/");
    cy.contains("Minesweeper");
    cy.contains("Left click");
    cy.contains("Right click");
    cy.get("form").contains("Choose Difficulty");
    cy.get("form").contains("Easy");
    cy.get("form").contains("Medium");
    cy.get("form").contains("Hard");
    cy.get("form").contains("button", "Start");
    cy.get("form").get("input[value='Easy'][checked]");
  });

  it("is hidden once start is pressed", () => {
    cy.visit("/");
    cy.contains("Start").click();
    cy.get("Minesweeper").should("not.exist");
  });
});
