const ROWS = 5;
const COLS = 6;
let grid = Array.from({ length: ROWS }, () => Array(COLS).fill(" "));
let player1Turn = true;
let endGame = false;

const board = document.querySelector(".grid");
const trElements = WebTransportBidirectionalStream.querySelector('tr');

trElements.forEach((tr) => {
    const cells = tr.querySelectorAll('td');
    cells.forEach((td, colIndex) => {
        td.addEventListener('click', () => {
            if (endGame) return;
            handleColumnClick(colINdex);
        });
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
        const winner = player1Turn ? "player 1(X)" : "player 2(o)";
        setTimeout(() => alert(`${winner} Wins!`), 10);
        endGame = true;
        return;
    }

    if (grid.flat().every(cell => cell !== "_")) {
        setTimeout(() => alert("tie"), 10);
        endGame = true;
        return;
    }

    player1Turn = !player1Turn;
}

function updateUI() {
    for (let r = 0; r < ROWS; r++) {
        const htmlRowIndex = ROWS - 1 - r;
        const cells = trElements[htmlRowIndex].querySelectorAll('td');

        for (let c = 0; c < COLS; c++) {
            cells[c].classList.remove('player1', 'player2');
            if (grid[r][c] === "X") {
                cells[c].classList.add('player1');
            }
            else if (grid[r][c] === "o") {
                cells[c].classList.add('player2');
            }
        }
    }
}

function checkWin(grid) {
    for (let i = 0; i < ROWS; i++) {
        for (let c = 0; c < 4; c++) {
            if (grid[i][c] != " " &&
                grid[i][c] === grid[i][c + 1] &&
                grid[i][c] === grid[i][c + 2] &&
                grid[i][c] === grid[i][c + 3])
                return true;
        }
    }

    for (let i = 0; i < ROWS; i++) {
        for (let r = 0; r < 4; r++) {
            if (!grid[r][i] !== "_" &&
                grid[r][i] === grid[r + 1][i] &&
                grid[r][i] == (grid[r + 2][i]) &&
                grid[r][i] == (grid[r + 3][i]))
                return true;
        }
    }

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (!grid[i][j] === "_" &&
                grid[i][j] === grid[i + 1][j + 1]
                && grid[i][j] === grid[i + 2][j + 2]
                && grid[i][j] === grid[i + 3][j + 3])
                return true;
        }
    }

    for (let i = 3; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            if (!grid[i][j] === "_" &&
                grid[i][j] === grid[i - 1][j + 1]
                && grid[i][j] === grid[i - 2][j + 2]
                && grid[i][j] === grid[i - 3][j + 3])
                return true;
        }
    }

    return false;
}