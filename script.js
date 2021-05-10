import {
  createBoard,
  markTile,
  revealTile,
  TILE_STATUSES,
  checkWin,
  checkLose,
} from "./minesweeper.js";

// 1. Create a grid using 2-dimensional array
//    a. reveal the tile
//    b. mark the tile
// 4. Check for win/lose

// UI

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 5;

const boardElement = document.querySelector(".board");
const mineCount = document.querySelector("[data-mine-count]");
const messageText = document.querySelector(".subtext");

boardElement.style.setProperty("--size", BOARD_SIZE);
const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
board.forEach((row) =>
  row.forEach((tile) => {
    tile.element.addEventListener("click", () => {
      revealTile(board, tile);
      checkGameEnd();
    });
    tile.element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      markTile(tile);
      listMineLeft();
    });
    boardElement.append(tile.element);
  })
);

mineCount.textContent = NUMBER_OF_MINES;

function listMineLeft() {
  const markedTile = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_STATUSES.MARKED).length
    );
  }, 0);
  console.log(markedTile);
  mineCount.textContent = NUMBER_OF_MINES - markedTile;
}

export function checkGameEnd() {
  const win = checkWin(board);
  const lose = checkLose(board);

  if (win || lose) {
    boardElement.addEventListener("click", stopProp, { capture: true });
    boardElement.addEventListener("contextMenu", stopProp, { capture: true });
  }

  if (win) {
    messageText.textContent = "You Win";
  }

  if (lose) {
    messageText.textContent = "You Lose";

    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === TILE_STATUSES.MARKED) {
          markTile(tile);
        }
        if (tile.isMine) {
          revealTile(board, tile);
        }
      });
    });
  }
}

function stopProp(e) {
  e.stopImmediatePropagation();
}
