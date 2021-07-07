import { EndScreen } from "./EndScreen";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("EndScreen Testing", () => {
  let context;

  describe("When game won", () => {
    beforeEach(() => {
      context = render(<EndScreen gameOver={true} winner={true} />);
    });

    it("Should contain you won text", () => {
      const { queryByText } = context;
      expect(queryByText("You Win")).not.toBeNull();
    });

    it("Should not contain losing text", () => {
      const { queryByText } = context;
      expect(queryByText("You Lose")).toBeNull();
    });
  });

  describe("When game lost", () => {
    beforeEach(() => {
      context = render(<EndScreen gameOver={true} winner={false} />);
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
        <EndScreen gameOver={true} winner={false} restartGame={restartGame} />
      );
    });

    it("should return game to start screen and start state", () => {
      const { getByText } = context;
      userEvent.click(getByText("Restart"));

      expect(restartGame).toHaveBeenCalled();
    });
  });
});
