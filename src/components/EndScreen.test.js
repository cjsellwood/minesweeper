import { EndScreen } from "./EndScreen";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("EndScreen Testing", () => {
  let context;
  let fetchScores;
  fetchScores = jest.fn().mockName("fetchScores");

  describe("When game won", () => {
    beforeEach(() => {
      context = render(
        <EndScreen
          gameOver={true}
          winner={true}
          winTime={7}
          scores={{
            Easy: [],
            Medium: [],
            Hard: [],
          }}
          fetchScores={fetchScores}
        />
      );
    });

    it("Should contain you won text", () => {
      const { queryByText } = context;
      expect(queryByText("You Win")).not.toBeNull();
    });

    it("Should not contain losing text", () => {
      const { queryByText } = context;
      expect(queryByText("You Lose")).toBeNull();
    });

    it("should contain the time taken to win", () => {
      const { queryByText } = context;
      expect(queryByText("Time: 7s")).not.toBeNull();
    });
  });

  describe("When game lost", () => {
    beforeEach(() => {
      context = render(
        <EndScreen
          gameOver={true}
          winner={false}
          scores={{
            Easy: [],
            Medium: [],
            Hard: [],
          }}
          fetchScores={fetchScores}
        />
      );
    });

    it("Should contain you lose text", () => {
      const { queryByText } = context;
      expect(queryByText("You Lose")).not.toBeNull();
    });

    it("Should not contain winning text", () => {
      const { queryByText } = context;
      expect(queryByText("You Win")).toBeNull();
    });
  });

  describe("Restart button", () => {
    let restartGame;
    beforeEach(() => {
      restartGame = jest.fn().mockName("restartGame");
      context = render(
        <EndScreen
          gameOver={true}
          winner={false}
          restartGame={restartGame}
          scores={{
            Easy: [],
            Medium: [],
            Hard: [],
          }}
          fetchScores={fetchScores}
        />
      );
    });

    it("should return game to start screen and start state", () => {
      const { getByText } = context;
      userEvent.click(getByText("Restart"));

      expect(restartGame).toHaveBeenCalled();
    });
  });

  describe("Submitting score", () => {
    let submitScore;
    beforeEach(() => {
      submitScore = jest.fn().mockName("submitScore");
      context = render(
        <EndScreen
          gameOver={true}
          winner={true}
          submitScore={submitScore}
          scores={{
            Easy: [],
            Medium: [],
            Hard: [],
          }}
          fetchScores={fetchScores}
        />
      );
    });

    it("should call submitScore", () => {
      const name = "test name";
      const { getByLabelText, getByText } = context;

      userEvent.type(getByLabelText("Enter Name"), name);

      userEvent.click(getByText("Submit Score"));

      expect(submitScore).toHaveBeenCalledWith(name);
    });
  });

  describe("initially", () => {
    beforeEach(() => {
      context = render(
        <EndScreen
          gameOver={true}
          winner={true}
          scores={{
            Easy: [
              { name: "bob", score: 22 },
              { name: "bill", score: 55 },
            ],
            Medium: [
              { name: "mark", score: 25 },
              { name: "matt", score: 88 },
            ],
            Hard: [
              { name: "jeff", score: 122 },
              { name: "jack", score: 999 },
            ],
          }}
          fetchScores={fetchScores}
          isFetched={true}
        />
      );
    });

    it("should render any high scores saved", () => {
      const { queryByText } = context;

      expect(queryByText("bob")).not.toBeNull();
      expect(queryByText("22")).not.toBeNull();
    });
  });

  describe("Should load high scores from firebase on first load", () => {
    it("should call fetchScores", () => {
      context = render(
        <EndScreen
          gameOver={true}
          winner={true}
          winTime={7}
          scores={{
            Easy: [],
            Medium: [],
            Hard: [],
          }}
          fetchedScores={false}
          fetchScores={fetchScores}
        />
      );
      expect(fetchScores).toHaveBeenCalled();
    });

    it("should not call fetchScores if previously fetched", () => {
      context = render(
        <EndScreen
          gameOver={true}
          winner={true}
          winTime={7}
          scores={{
            Easy: [],
            Medium: [],
            Hard: [],
          }}
          isFetched={true}
          fetchScores={fetchScores}
        />
      );
      expect(fetchScores).not.toHaveBeenCalled();
    });
  });
});
