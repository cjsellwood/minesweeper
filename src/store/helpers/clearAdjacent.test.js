import clearAdjacent from "./clearAdjacent";
import { checkSurrounds } from "./clearAdjacent";
import { testBoard } from "./testBoard";
import copyBoard from "./copyBoard";

describe("Clearing adjacent tiles function", () => {
  it("should clear the specified space and any non mine spots touching it", () => {
    let board = clearAdjacent(copyBoard(testBoard), 0, 0);
    expect(board[0][0].clear).toEqual(true);
    expect(board[0][1].clear).toEqual(true);
    expect(board[1][0].clear).toEqual(true);
    expect(board[1][1].clear).toEqual(true);
    expect(board[2][0].clear).toEqual(true);
    expect(board[2][1].clear).toEqual(true);
  });
});