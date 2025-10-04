let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let gameMode = "ai"; 

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const modeSelector = document.getElementById("gameMode");

cells.forEach(cell => cell.addEventListener("click", cellClicked));

function cellClicked(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  makeMove(index, currentPlayer);

  if (gameActive && gameMode === "ai" && currentPlayer === "O") {
    setTimeout(aiMove, 500); 
  }
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;

  if (checkWinner(player)) {
    statusText.textContent = `${player} wins!`;
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = player === "X" ? "O" : "X";
    statusText.textContent = `Turn: ${currentPlayer}`;

    if (gameMode === "ai" && currentPlayer === "O") {
      setTimeout(aiMove, 500);
    }
  }
}

function aiMove() {
  if (!gameActive || currentPlayer !== "O") return;

  const emptyIndices = board.map((val, idx) => val === "" ? idx : null).filter(idx => idx !== null);
  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

  makeMove(randomIndex, "O");
}

function checkWinner(player) {
  return winningCombos.some(combo => combo.every(i => board[i] === player));
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  gameMode = modeSelector.value; // update mode
  cells.forEach(cell => cell.textContent = "");
  statusText.textContent = `Turn: ${currentPlayer}`;
}
