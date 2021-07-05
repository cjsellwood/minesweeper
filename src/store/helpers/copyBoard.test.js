import copyBoard from "./copyBoard";
import {testBoard} from "./testBoard";

describe("Copy board function", () => {
  it("should copy a board immutably", () => {
    expect(copyBoard(testBoard)).toEqual(testBoard);
  });
});
