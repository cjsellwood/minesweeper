import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Gameboard } from "./Gameboard";
import { testResult as board } from "../store/helpers/testBoard";

describe("Gameboard testing", () => {
  let context;

  describe("Initially", () => {
    beforeEach(() => {
      context = render(<Gameboard board={board} gameOver={true} />);
    });

    it("loads 9 boxes with test board", () => {
      const { getAllByTestId } = context;
      expect(getAllByTestId("square").length).toEqual(9);
    });

    it("shows a timer", () => {
      const { getByText } = context;
      expect(getByText("0")).not.toBeNull();
    });
  });

  describe("Right clicking on a square", () => {
    let flagSquare;
    beforeEach(() => {
      flagSquare = jest.fn().mockName("flagSquare");
      context = render(<Gameboard board={board} flagSquare={flagSquare} />);
    });

    it("calls action to redux store to change square to flag", () => {
      const { getAllByTestId } = context;

      fireEvent.contextMenu(getAllByTestId("square")[0]);
      expect(flagSquare).toHaveBeenCalledWith(0, 0);

      fireEvent.contextMenu(getAllByTestId("square")[4]);
      expect(flagSquare).toHaveBeenCalledWith(1, 1);
    });

    it("should do nothing if game is over", () => {
      const { getAllByTestId, rerender } = context;

      rerender(
        <Gameboard board={board} flagSquare={flagSquare} gameOver={true} />
      );

      userEvent.click(getAllByTestId("square")[0]);
      expect(flagSquare).not.toHaveBeenCalledWith(0, 0);
    });
  });

  describe("Left clicking on a square", () => {
    let clearSquare;
    beforeEach(() => {
      clearSquare = jest.fn().mockName("clearSquare");
      context = render(<Gameboard board={board} clearSquare={clearSquare} />);
    });

    it("clears the square to reveal whats underneath", () => {
      const { getAllByTestId } = context;

      userEvent.click(getAllByTestId("square")[0]);
      expect(clearSquare).toHaveBeenCalledWith(0, 0);
    });

    it("should do nothing if game is over", () => {
      const { getAllByTestId, rerender } = context;

      rerender(
        <Gameboard board={board} clearSquare={clearSquare} gameOver={true} />
      );

      userEvent.click(getAllByTestId("square")[0]);
      expect(clearSquare).not.toHaveBeenCalledWith(0, 0);
    });
  });
});
