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
          scoreSubmitted={false}
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
      expect(queryByText("Your Score: 7")).not.toBeNull();
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
              { name: "a", score: 1 },
              { name: "b", score: 2 },
              { name: "c", score: 3 },
              { name: "d", score: 4 },
              { name: "e", score: 5 },
              { name: "f", score: 6 },
              { name: "g", score: 7 },
              { name: "h", score: 8 },
              { name: "i", score: 9 },
              { name: "j", score: 10 },
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

  describe("Submitting a users second score", () => {
    let postScore;
    let setScoreSubmitted;
    let difficulty = "Easy";
    let winTime = 7;
    beforeEach(() => {
      postScore = jest.fn().mockName("postScore");
      setScoreSubmitted = jest.fn().mockName("setScoreSubmitted");
      context = render(
        <EndScreen
          gameOver={true}
          winner={true}
          postScore={postScore}
          scores={{
            Easy: [
              { name: "a", score: 1 },
              { name: "b", score: 2 },
              { name: "c", score: 3 },
              { name: "d", score: 4 },
              { name: "test name", score: 5 },
              { name: "f", score: 6 },
              { name: "g", score: 7 },
              { name: "h", score: 8 },
              { name: "i", score: 9 },
              { name: "j", score: 10 },
            ],
            Medium: [],
            Hard: [],
          }}
          fetchScores={fetchScores}
          winTime={winTime}
          difficulty={difficulty}
          setScoreSubmitted={setScoreSubmitted}
        />
      );
    });
    it("should not call postScore if user already has a better score", () => {
      const name = "test name";
      const { getByLabelText, getByText } = context;

      userEvent.type(getByLabelText("Enter Name"), name);

      userEvent.click(getByText("Submit Score"));
      expect(postScore).not.toHaveBeenCalled();
      expect(setScoreSubmitted).toHaveBeenCalled();
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
