const ROWS = 6;
const COLS = 7;
let grid = Array.from({ length: ROWS }, () => Array(COLS).fill(" "));
let player1Turn = true;
let endGame = false;

const board = document.querySelector(".grid");
const trElements = board.querySelectorAll('tr');
const player1Indicator = document.querySelector("#player1-indicator");
const player2Indicator = document.querySelector("#player2-indicator");

updateTurnIndicator();

document.querySelectorAll('.bubbles').forEach(button => {
    button.addEventListener('click', () => {
        if (endGame) return;
        const col = parseInt(button.getAttribute('data-col'));
        handleColumnClick(col);
    });
});

function handleColumnClick(col) {
    if (endGame) return;

    let placedRow = -1;
    for (let r = 0; r < ROWS; r++) {
        if (grid[r][col] === " ") {
            placedRow = r;
            break;
        }
    }

    if (placedRow === -1) {
        alert("full");
        return;
    }

    const symbol = player1Turn ? "X" : "O";
    grid[placedRow][col] = symbol;

    updateUI();

    if (checkWin(grid)) {
        const winner = player1Turn ? "Player 1(Nemo)" : "Player 2(Dory)";
        setTimeout(() => alert(`${winner} Wins!`), 10);
        endGame = true;
        return;
    }

    if (grid.flat().every(cell => cell !== " ")) {
        setTimeout(() => alert("tie"), 10);
        endGame = true;
        return;
    }

    player1Turn = !player1Turn;
    updateTurnIndicator();
}

function updateTurnIndicator() {
    player1Indicator.classList.toggle("glow", player1Turn);
    player2Indicator.classList.toggle("glow", !player1Turn);
}

function updateUI() {
    for (let r = 0; r < ROWS; r++) {
        const htmlRowIndex = ROWS - 1 - r;
        const cells = trElements[htmlRowIndex].querySelectorAll('td');

        for (let c = 0; c < COLS; c++) {
            const cell = cells[c];
            cell.innerHTML = "";

            if (grid[r][c] === "X") {
                const img = document.createElement("img");
                img.src = "/assets/nemo.png";
                img.alt = "X";
                cell.appendChild(img);
            }

            else if (grid[r][c] === "O") {
                const img = document.createElement("img");
                img.src = "/assets/dory.png";
                img.alt = "O";
                cell.appendChild(img);
            }
        }
    }
}

function checkWin(grid) {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < 4; c++) {
            if (grid[r][c] != " " &&
                grid[r][c] === grid[r][c + 1] &&
                grid[r][c] === grid[r][c + 2] &&
                grid[r][c] === grid[r][c + 3])
                return true;
        }
    }

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < COLS; c++) {
            if (grid[r][c] !== " " &&
                grid[r][c] === grid[r + 1][c] &&
                grid[r][c] == (grid[r + 2][c]) &&
                grid[r][c] == (grid[r + 3][c]))
                return true;
        }
    }

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 4; c++) {
            if (grid[r][c] !== " " &&
                grid[r][c] === grid[r + 1][c + 1]
                && grid[r][c] === grid[r + 2][c + 2]
                && grid[r][c] === grid[r + 3][c + 3])
                return true;
        }
    }

    for (let r = 3; r < ROWS; r++) {
        for (let c = 0; c < 4; c++) {
            if (grid[r][c] !== " " &&
                grid[r][c] === grid[r - 1][c + 1]
                && grid[r][c] === grid[r - 2][c + 2]
                && grid[r][c] === grid[r - 3][c + 3])
                return true;
        }
    }

    return false;
}