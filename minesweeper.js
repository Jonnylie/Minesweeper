// Logic

export const TILE_STATUSES = {
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
      element.dataset.status = TILE_STATUSES.HIDDEN;
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
  if (
    tile.status !== TILE_STATUSES.HIDDEN &&
    tile.status !== TILE_STATUSES.MARKED
  )
    return;

  if (tile.status === TILE_STATUSES.MARKED) {
    tile.status = TILE_STATUSES.HIDDEN;
  } else {
    tile.status = TILE_STATUSES.MARKED;
  }
}

export function revealTile(board, tile) {
  if (tile.status !== TILE_STATUSES.HIDDEN) {
    return;
  }

  if (tile.isMine) {
    tile.status = TILE_STATUSES.MINE;
    return;
  }

  tile.status = TILE_STATUSES.NUMBER;

  const adjacentTiles = nearbyTiles(board, tile);
  const mines = adjacentTiles.filter((adjTile) => adjTile.isMine);
  if (mines.length === 0) {
    adjacentTiles.forEach(revealTile.bind(null, board));
  } else {
    tile.element.textContent = mines.length;
  }
}

export function checkWin(board) {
  return board.every((row) =>
    row.every(
      (tile) =>
        tile.status === TILE_STATUSES.NUMBER ||
        (tile.isMine &&
          (tile.status === TILE_STATUSES.MARKED ||
            tile.status === TILE_STATUSES.HIDDEN))
    )
  );
}

export function checkLose(board) {
  return board.some((row) =>
    row.some((tile) => tile.status === TILE_STATUSES.MINE)
  );
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

export function nearbyTiles(board, { x, y }) {
  const Tiles = [];
  for (let xOffSet = -1; xOffSet <= 1; xOffSet++) {
    for (let yOffSet = -1; yOffSet <= 1; yOffSet++) {
      const tile = board[x + xOffSet]?.[y + yOffSet];
      if (tile) {
        Tiles.push(tile);
      }
    }
  }
  return Tiles;
}
