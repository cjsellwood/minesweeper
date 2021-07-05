import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Gameboard } from "./Gameboard";
import { testResult as board } from "../store/tests/testBoard";

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

    it("has a mine in the top right corner", () => {
      const { getAllByTestId } = context;
      expect(getAllByTestId("square")[2]).toHaveTextContent("💣");
    });

    it("the center spot has 2 mines adjacent and is shown", () => {
      const { getAllByTestId } = context;
      expect(getAllByTestId("square")[4]).toHaveTextContent("2");
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
  });
});
