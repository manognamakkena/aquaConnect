const ROWS = 6;
const COLS = 7;
let grid = Array.from({ length: ROWS }, () => Array(COLS).fill(" "));
let player1Turn = true;
let endGame = false;

const board = document.querySelector(".grid");
const trElements = board.querySelectorAll('tr');

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
        const winner = player1Turn ? "player 1(X)" : "player 2(o)";
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
    for (let i = 0; i < ROWS; i++) {
        for (let r = 0; r < 4; r++) {
            if (grid[r][c] != " " &&
                grid[r][c] === grid[r][c + 1] &&
                grid[r][c] === grid[r][c + 2] &&
                grid[r][c] === grid[r][c + 3])
                return true;
        }
    }

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < COLS; c++) {
            if (grid[r][i] !== " " &&
                grid[r][i] === grid[r + 1][c] &&
                grid[r][i] == (grid[r + 2][c]) &&
                grid[r][i] == (grid[r + 3][c]))
                return true;
        }
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] !== " " &&
                grid[i][j] === grid[i + 1][j + 1]
                && grid[i][j] === grid[i + 2][j + 2]
                && grid[i][j] === grid[i + 3][j + 3])
                return true;
        }
    }

    for (let i = 3; i < ROWS; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] !== " " &&
                grid[i][j] === grid[i - 1][j + 1]
                && grid[i][j] === grid[i - 2][j + 2]
                && grid[i][j] === grid[i - 3][j + 3])
                return true;
        }
    }

    return false;
}