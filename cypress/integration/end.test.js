describe("After game over screen", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Start").click();
  });

  it("End Screen should not be shown before game Over", () => {
    cy.get("div.EndScreen").should("not.exist");
    cy.get("div.EndScreen").should("not.exist");
  });
});

describe("Losing game", () => {
  before(() => {
    cy.visit("/");
    cy.contains("Start").click();

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

  it("should not show time taken to win", () => {
    cy.get("h2.win-time").should("not.exist");
  });

  it("should not show a form to submit score", () => {
    cy.get("form").should("not.exist");
  });

  it("should contain restart button", () => {
    cy.contains("Restart");
  });

  it("should go to start screen if pressing restart", () => {
    cy.get("button.restart-button").click();
    cy.contains("Minesweeper");
  });
});

describe("Winning game", () => {
  before(() => {
    cy.visit("/");
    cy.contains("Start").click();
    cy.get("div[data-cypress='no-mine']").click({ multiple: true });
  });

  it("should show that game was won", () => {
    cy.get("div.EndScreen").contains("You Win");
  });

  it("should show time taken to win", () => {
    cy.get("h2.win-time").should("exist");
  });

  it("should show a scoreboard", () => {
    cy.get("div.EndScreen").contains("Easy");
    cy.get("div.EndScreen").contains("Medium");
    cy.get("div.EndScreen").contains("Hard");
    cy.get("ol").should("have.length", 3);
  });

  it("should show a form to submit score", () => {
    cy.get("form").should("exist");
    cy.get("form").get("input").should("exist");
    cy.get("form").get("button[type='submit']").should("exist");
  });

  it("should allow user to type name", () => {
    cy.get("form").get("input").type("test name");
    cy.get("form").get("input").should("have.value", "test name");
  });

  it("submits score to scoreboard", () => {
    cy.get("button[type='submit']").click();
    cy.get("div.EndScreen").contains("test name");
  });
});
