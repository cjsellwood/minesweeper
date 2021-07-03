import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DifficultyForm from "./DifficultyForm";

describe("Difficulty selection form", () => {
  let context;
  let storeDifficulty;

  beforeEach(() => {
    storeDifficulty = jest.fn().mockName("storeDifficulty");
    context = render(<DifficultyForm storeDifficulty={storeDifficulty}/>);
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
      const { getByTestId } = context;
      userEvent.click(getByTestId("medium-difficulty"));

      expect(getByTestId("easy-difficulty")).not.toHaveAttribute("checked");
      expect(getByTestId("medium-difficulty")).toHaveAttribute("checked");
    });

    it("should be checked as medium if clicked on medium label", () => {
      const { getByText, getByTestId } = context;
      userEvent.click(getByText("Medium"));

      expect(getByTestId("easy-difficulty")).not.toHaveAttribute("checked");
      expect(getByTestId("medium-difficulty")).toHaveAttribute("checked");
    });
  });

  describe("Clicking on start button", () => {
    it("should call function to store difficulty in redux", () => {
      const { getByText } = context;

      userEvent.click(getByText("Start"));

      expect(storeDifficulty).toHaveBeenCalledWith("Easy");
    });
  });
});
