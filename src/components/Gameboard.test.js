import { render } from "@testing-library/react";
import { Gameboard } from "./Gameboard";
import { testResult as board } from "../store/tests/testBoard";

describe("Gameboard testing", () => {
  let context;

  beforeEach(() => {
    context = render(<Gameboard board={board} gameOver={true}/>);
  });

  describe("Initially", () => {
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
});
