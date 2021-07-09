import {
  generateBoard,
  populateMines,
  flattenArray,
  calculateAdjacent,
} from "./boardGeneration";
import { testBoard, testResult } from "./testBoard";

describe("generateBoard function", () => {
  describe("when called with easy difficulty", () => {
    it("should return a 10 x 10 array", () => {
      expect(generateBoard("Easy").length).toEqual(10);
      expect(generateBoard("Easy")[0].length).toEqual(10);
      expect(generateBoard("Easy")[9].length).toEqual(10);
    });

    it("should contain an object with square information in each", () => {
      expect(generateBoard("Easy")[0][0]).toEqual({
        clear: false,
        mine: false,
        flag: false,
        adjacent: 0,
      });
      expect(generateBoard("Easy")[9][9]).toEqual({
        clear: false,
        mine: false,
        flag: false,
        adjacent: 0,
      });
    });
  });
  describe("when called with medium difficulty", () => {
    it("should return a 20 x 20 array", () => {
      expect(generateBoard("Medium").length).toEqual(20);
      expect(generateBoard("Medium")[0].length).toEqual(20);
      expect(generateBoard("Medium")[19].length).toEqual(20);
    });
  });
  describe("when called with hard difficulty", () => {
    it("should return a 30 x 30 array", () => {
      expect(generateBoard("Hard").length).toEqual(30);
      expect(generateBoard("Hard")[0].length).toEqual(30);
      expect(generateBoard("Hard")[29].length).toEqual(30);
    });
  });
});

describe("populate mines function", () => {
  it("should add 15 mines on easy difficulty", () => {
    let board = generateBoard("Easy");
    board = populateMines("Easy", board);

    expect(
      flattenArray(board).filter((square) => square.mine === true).length
    ).toEqual(15);
  });

  it("should add 180 mines on easy difficulty", () => {
    let board = generateBoard("Hard");
    board = populateMines("Hard", board);

    expect(
      flattenArray(board).filter((square) => square.mine === true).length
    ).toEqual(180);
  });
});

describe("flatten array function", () => {
  it("should turn a 2 dimensional array into a 1 dimensional array", () => {
    expect(
      flattenArray([
        [1, 2],
        [3, 4],
      ])
    ).toEqual([1, 2, 3, 4]);
  });
});

describe("calculate adjacent mines function", () => {
  it("should calculate the number of adjacent mines for each square", () => {
    expect(calculateAdjacent(testBoard)).toEqual(testResult);
  });
});
