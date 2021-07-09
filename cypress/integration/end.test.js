describe("EndScreen", () => {
  before(() => {
    cy.intercept(
      "GET",
      "https://minesweeper-237c5-default-rtdb.firebaseio.com/scores.json",
      {
        statusCode: 200,
        body: {
          Easy: {
            "Test User": 1234,
          },
          Medium: {
            "Test User 2": 4452,
          },
          Hard: {
            "Test User 3": 32455,
            "Test User 4": 9999,
          },
        },
      }
    ).as("fetchScores");
  });

  it("calls the firebase api to get high scores", () => {
    cy.visit("/");
    cy.contains("Start").click();
    cy.get("div[data-cypress='no-mine']").each((el) => {
      el.click();
    });
    cy.wait("@fetchScores");
    cy.get("div.EndScreen").contains("Test User 3");
  });

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
      cy.intercept(
        "GET",
        "https://minesweeper-237c5-default-rtdb.firebaseio.com/scores.json",
        {
          statusCode: 200,
          body: {
            Easy: {
              "Test User": 1234,
            },
            Medium: {
              "Test User 2": 4452,
            },
            Hard: {
              "Test User 3": 32455,
              "Test User 4": 9999,
            },
          },
        }
      ).as("fetchScores");

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
      cy.contains("Restart").click();
      cy.contains("Minesweeper");
    });
  });

  describe("Winning game", () => {
    before(() => {
      cy.intercept(
        "GET",
        "https://minesweeper-237c5-default-rtdb.firebaseio.com/scores.json",
        {
          statusCode: 200,
          body: {
            Easy: {
              "Test User": 1234,
            },
            Medium: {
              "Test User 2": 4452,
            },
            Hard: {
              "Test User 3": 32455,
              "Test User 4": 9999,
            },
          },
        }
      ).as("fetchScores");

      cy.visit("/");
      cy.contains("Start").click();
      cy.get("div[data-cypress='no-mine']").each((el) => {
        el.click();
      });
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
      cy.get("ul").should("have.length", 9);
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
      cy.intercept(
        "PATCH",
        "https://minesweeper-237c5-default-rtdb.firebaseio.com/scores/Easy.json",
        {
          statusCode: 200,
          body: {
            message: "Done",
          },
        }
      );
      cy.get("button[type='submit']").click();
      cy.get("div.EndScreen").contains("test name");
    });
  });
});
