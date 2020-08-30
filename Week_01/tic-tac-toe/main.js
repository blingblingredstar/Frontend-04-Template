const GAME_STATUS = {
  PLAYER_ONE: 1,
  PLAYER_TWO: 2,
  EMPTY: 0,
};

const ICON = {
  [GAME_STATUS.PLAYER_ONE]: "⭕",
  [GAME_STATUS.PLAYER_TWO]: "❌",
};

const clone = (matrix = []) => Object.create(matrix);

class TicTacToe {
  constructor(selector) {
    this.matrix = [
      GAME_STATUS.EMPTY,
      GAME_STATUS.EMPTY,
      GAME_STATUS.EMPTY,

      GAME_STATUS.EMPTY,
      GAME_STATUS.EMPTY,
      GAME_STATUS.EMPTY,

      GAME_STATUS.EMPTY,
      GAME_STATUS.EMPTY,
      GAME_STATUS.EMPTY,
    ];
    this.container = document.querySelector(selector);
    this.currentPlayer = GAME_STATUS.PLAYER_ONE;
    this.draw();
  }

  draw() {
    this.container.innerHTML = "";
    this.matrix.forEach((cell, index) => {
      const cellEl = document.createElement("div");
      cellEl.classList.add("cell");
      cellEl.textContent = ICON[cell] || "";
      cellEl.addEventListener("click", () => this.playerMove(index));
      this.container.appendChild(cellEl);

      if ((index + 1) % 3 === 0) {
        this.container.appendChild(document.createElement("br"));
      }
    });
  }

  printWinner() {
    const currentPlayer =
      this.currentPlayer === GAME_STATUS.PLAYER_ONE
        ? ICON.PLAYER_ONE
        : ICON.PLAYER_TWO;

    alert(`${currentPlayer} is winner`);
  }

  nextPlayer(player) {
    return 3 - player;
  }

  playerMove(index) {
    if (this.matrix[index] !== GAME_STATUS.EMPTY) return;

    this.matrix[index] = this.currentPlayer;

    if (this.hasWinner(this.matrix, this.currentPlayer)) {
      this.printWinner();
    }

    this.currentPlayer = this.nextPlayer(this.currentPlayer);
    this.draw();
    this.computerMove();
  }

  computerMove() {
    const { point } = this.bestChoice(this.matrix, this.currentPlayer);
    if (point) this.matrix[point[1] * 3 + point[0]] = this.currentPlayer;

    if (this.hasWinner(this.matrix, this.currentPlayer)) {
      this.printWinner();
    }
    this.currentPlayer = this.nextPlayer(this.currentPlayer);
    this.draw();
  }

  hasWinner(matrix, player) {
    for (let row = 0; row < 3; row++) {
      let hasWin = true;
      for (let col = 0; col < 3; col++) {
        if (matrix[row * 3 + col] !== player) {
          hasWin = false;
        }
      }
      if (hasWin) return true;
    }

    for (let row = 0; row < 3; row++) {
      let hasWin = true;
      for (let col = 0; col < 3; col++) {
        if (matrix[col * 3 + row] !== player) {
          hasWin = false;
        }
      }
      if (hasWin) return true;
    }

    {
      let hasWin = true;
      for (let col = 0; col < 3; col++) {
        if (matrix[col * 3 + col] !== player) {
          hasWin = false;
        }
      }
      if (hasWin) return true;
    }

    {
      let hasWin = true;
      for (let col = 0; col < 3; col++) {
        if (matrix[col * 3 + 2 - col] !== player) {
          hasWin = false;
        }
      }
      if (hasWin) return true;
    }

    return false;
  }

  willWin(matrix = [], player = 1) {
    const position = matrix.findIndex((cell, index) => {
      if (cell !== GAME_STATUS.EMPTY) return false;
      const copy = clone(matrix);
      copy[index] = player;
      return this.hasWinner(copy, player);
    });
    return position >= 0 ? [position % 3, parseInt(position / 3)] : null;
  }

  bestChoice(matrix = [], player = 1) {
    let point = this.willWin(matrix, player);

    if (point) {
      return {
        point,
        result: 1,
      };
    }

    let result = -2;
    matrix.every((cell, index) => {
      if (cell) return true;
      const copy = clone(matrix);
      copy[index] = player;
      const opp = this.bestChoice(copy, this.nextPlayer(player)).result;
      if (-opp >= result) {
        point = [index % 3, parseInt(index / 3)];
        result = -opp;
        if (result === 1) return false;
      }
      return true;
    });

    return {
      point,
      result: point ? result : 0,
    };
  }
}

new TicTacToe("#game");
