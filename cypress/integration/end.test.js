describe("After game over screen", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Start").click();
  });

  it("End Screen should not be shown before game Over", () => {
    cy.get("div.EndScreen").should("not.exist");
    cy.get("div.EndScreen").should("not.exist");
  });

  describe("Winning game", () => {
    beforeEach(() => {
      cy.get("div[data-cypress='no-mine']").click({ multiple: true });
    });

    it("should show that game was won", () => {
      cy.get("div.EndScreen").contains("You Win");
    });
  });

  describe("Losing game", () => {
    beforeEach(() => {
      let mine = 0;
      cy.get("div.square").each((el) => {
        if (mine === 0) {
          el.click();
          if (el.find("p.mine").length) {
            mine++;
          }
        }
      });
    });

    it("should show that game was lost", () => {
      cy.get("div.EndScreen").contains("You Lose");
    });

    it("should contain restart button", () => {
      cy.contains("Restart");
    });

    it("should go to start screen if pressing restart", () => {
      cy.get("button.restart-button").click();
      cy.contains("Minesweeper");
    });
  });
});
