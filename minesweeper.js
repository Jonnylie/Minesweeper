// Logic

const TILE_STATUS = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
};

export function createBoard(boardSize, numberOfMines) {
  const board = [];
  const minePosition = getMinePosition(boardSize, numberOfMines);

  for (let x = 0; x < boardSize; x++) {
    const row = [];
    for (let y = 0; y < boardSize; y++) {
      const element = document.createElement("div");
      element.dataset.status = TILE_STATUS.HIDDEN;
      const tile = {
        element,
        x,
        y,
        isMine: minePosition.some(positionMatch.bind(null, { x, y })),
        get status() {
          return this.element.dataset.status;
        },
        set status(value) {
          this.element.dataset.status = value;
        },
      };
      row.push(tile);
    }
    board.push(row);
  }
  console.log(board);
  return board;
}

export function markTile(tile) {
  if (tile.status !== TILE_STATUS.HIDDEN && tile.status !== TILE_STATUS.MARKED)
    return;

  if (tile.status === TILE_STATUS.MARKED) {
    tile.status = TILE_STATUS.HIDDEN;
  } else {
    tile.status = TILE_STATUS.MARKED;
  }
}

function getMinePosition(boardSize, numberOfMines) {
  const positions = [];

  while (positions.length < numberOfMines) {
    const position = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    };

    if (!positions.some(positionMatch.bind(null, position))) {
      // map or some is going to fill up the third parameter which is p every iteration
      // it can be simplified with  (!positions.some(positionMatch.bind(null, position)))
      // I write the parameter instead. for purpose to understand the bind method
      positions.push(position);
    }
  }
  return positions;
}

function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

function positionMatch(a, b) {
  return a.x === b.x && a.y === b.y;
}
