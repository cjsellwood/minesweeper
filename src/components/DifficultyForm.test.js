import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DifficultyForm } from "./DifficultyForm";

describe("Difficulty selection form", () => {
  let context;
  let storeDifficulty;
  let startGame;

  beforeEach(() => {
    storeDifficulty = jest.fn().mockName("storeDifficulty");
    startGame = jest.fn().mockName("startGame");
    context = render(
      <DifficultyForm
        storeDifficulty={storeDifficulty}
        startGame={startGame}
        difficulty={"Easy"}
      />
    );
  });

  describe("initially", () => {
    it("should be checked as easy by default", () => {
      const { getByTestId } = context;
      userEvent.click(getByTestId("easy-difficulty"));

      expect(getByTestId("easy-difficulty")).toHaveAttribute("checked");
    });
  });

  describe("Clicking on a difficulty", () => {
    it("should be checked as medium if clicked on medium checkbox", () => {
      const { getByTestId, rerender } = context;
      userEvent.click(getByTestId("medium-difficulty"));

      rerender(
        <DifficultyForm
          storeDifficulty={storeDifficulty}
          startGame={startGame}
          difficulty={"Medium"}
        />
      );

      expect(storeDifficulty).toHaveBeenCalledWith("Medium");
      expect(getByTestId("easy-difficulty")).not.toHaveAttribute("checked");
      expect(getByTestId("medium-difficulty")).toHaveAttribute("checked");
    });

    it("should be checked as medium if clicked on medium label", () => {
      const { getByText, getByTestId, rerender } = context;
      userEvent.click(getByText("Medium"));

      rerender(
        <DifficultyForm
          storeDifficulty={storeDifficulty}
          startGame={startGame}
          difficulty={"Medium"}
        />
      );

      expect(storeDifficulty).toHaveBeenCalledWith("Medium");
      expect(getByTestId("easy-difficulty")).not.toHaveAttribute("checked");
      expect(getByTestId("medium-difficulty")).toHaveAttribute("checked");
    });
  });

  describe("Clicking on start button", () => {
    it("should call function to start game with chosen difficulty", () => {
      const { getByText } = context;

      userEvent.click(getByText("Start"));

      expect(startGame).toHaveBeenCalled();
    });
  });
});
