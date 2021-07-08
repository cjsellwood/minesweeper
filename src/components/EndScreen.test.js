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
          difficulty={"Easy"}
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
          difficulty={"Easy"}
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
          difficulty={"Easy"}
        />
      );
    });

    it("should return game to start screen and start state", () => {
      const { getByText } = context;
      userEvent.click(getByText("Restart"));

      expect(restartGame).toHaveBeenCalled();
    });
  });

  describe("When game won but score too low for scoreboard", () => {
    let postScore;
    let difficulty = "Easy";
    let winTime = 100;
    beforeEach(() => {
      postScore = jest.fn().mockName("postScore");
      context = render(
        <EndScreen
          gameOver={true}
          winner={true}
          postScore={postScore}
          scores={{
            Easy: [
              { a: 1 },
              { b: 2 },
              { c: 3 },
              { d: 4 },
              { e: 5 },
              { f: 6 },
              { g: 7 },
              { h: 8 },
              { i: 9 },
              { j: 10 },
            ],
            Medium: [],
            Hard: [],
          }}
          fetchScores={fetchScores}
          winTime={winTime}
          difficulty={difficulty}
        />
      );
    });

    it("should not display submit score form", () => {
      const { queryByText } = context;
      expect(queryByText("Submit Score")).toBeNull();
    });
  });

  describe("Submitting score", () => {
    let postScore;
    let difficulty = "Easy";
    let winTime = 100;
    beforeEach(() => {
      postScore = jest.fn().mockName("postScore");
      context = render(
        <EndScreen
          gameOver={true}
          winner={true}
          postScore={postScore}
          scores={{
            Easy: [],
            Medium: [],
            Hard: [],
          }}
          fetchScores={fetchScores}
          winTime={winTime}
          difficulty={difficulty}
        />
      );
    });

    it("should call postScore", () => {
      const name = "test name";
      const { getByLabelText, getByText } = context;

      userEvent.type(getByLabelText("Enter Name"), name);

      userEvent.click(getByText("Submit Score"));

      expect(postScore).toHaveBeenCalledWith(name, winTime, difficulty);
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
          difficulty={"Easy"}
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
          isFetched={false}
          fetchedScores={false}
          fetchScores={fetchScores}
          difficulty={"Easy"}
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
          difficulty={"Easy"}
        />
      );
      expect(fetchScores).not.toHaveBeenCalled();
    });
  });
});
