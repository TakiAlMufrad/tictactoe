// Game state
let currentPlayer = "X";
let gameEnd = false;
let board = ["", "", "", "", "", "", "", "", ""];

// Create the game board
const boardContainer = document.querySelector(".board");
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = i;
  boardContainer.appendChild(cell);
}

// Add event listener to each cell
const cells = document.querySelectorAll(".cell");
cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

// Handle cell click event
function handleCellClick(event) {
  const cellIndex = event.target.dataset.index;
  if (board[cellIndex] !== "" || gameEnd) {
    return;
  }

  board[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.style.cursor = "default";

  // Check for win or draw
  if (checkWin(currentPlayer)) {
    endGame(`${currentPlayer} wins!`);
  } else if (checkDraw()) {
    endGame("It's a draw!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// Check for a win
function checkWin(player) {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }

  return false;
}

// Check for a draw
function checkDraw() {
  return !board.includes("");
}

// End the game
function endGame(message) {
  gameEnd = true;
  alert(message);
  location.reload();
  cells.forEach(cell => {
    cell.style.cursor = "default";
  });
}
