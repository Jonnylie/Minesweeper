import { createBoard, markTile } from "./minesweeper.js";

// 1. Create a grid using 2-dimensional array
// 2. Allow users to left click the tile
//    a. open the tile
// 3. Allow users to right click the tile
//    b. mark the tile
// 4. Check for win/lose

// UI

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 20;

const boardElement = document.querySelector(".board");
boardElement.style.setProperty("--size", BOARD_SIZE);
const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
board.forEach((row) =>
  row.forEach((tile) => {
    tile.element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      markTile(tile);
    });
    boardElement.append(tile.element);
  })
);
