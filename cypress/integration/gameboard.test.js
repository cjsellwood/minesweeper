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

  it("displays a flag when right clicking on a square", () => {
    cy.get("div.square").first().rightclick();
    cy.get("div.square").first().get("div.flag").should("exist");
  });

  it("removes flag when right clicking twice", () => {
    cy.get("div.square").first().rightclick();
    cy.get("div.square").first().rightclick();
    cy.get("div.flag").should("not.exist");
  });

  it("removes a flag if clicking on non mine square", () => {
    cy.get("div[data-cypress='no-mine']").rightclick({ multiple: true });
    cy.get("div.square").get("div.flag").should("exist");
    cy.get("div[data-cypress='no-mine']").each((el, index) => {
      if (index < 50) {
        el.click();
      }
    });
    cy.get("div.square").get("div.flag:only-child").should("not.exist");
    cy.get("div[data-cypress='no-mine']").first().click();
  });

  it("clears a square when left clicking it", () => {
    cy.get("div.square")
      .first()
      .within(() => {
        cy.get("p.unclear").should("exist");
      });
    cy.get("div.square").first().click();
    cy.get("div.square")
      .first()
      .within(() => {
        cy.get("p.unclear").should("not.exist");
      });
  });

  it("should show all mines if a mine clicked", () => {
    let mine = 0;
    cy.get("div.square").each((el) => {
      if (mine === 0) {
        el.click();
        if (el.find("p.mine").length) {
          mine++;
        }
      }
    });
    cy.get("div.Gameboard").find("div.mine").should("have.length", 15);
  });

  it("should have all mines flagged and no mines shown", () => {
    cy.get("div[data-cypress='no-mine']").each((el) => {
      el.click();
    });
    cy.get("div.flag").should("have.length", 15);
    cy.get("p.mine").should("have.length", 0);
  });

  it("should contain a timer that starts at 0", () => {
    cy.get("p.timer").contains(/^0$/);
  });

  it("timer should change to 1 after 1 second", () => {
    cy.wait(1000);
    cy.get("p.timer").contains(/^1$/);
  });
});
