let cells = [];
const rows = 6;
const columns = 7;
const parentDiv = document.querySelector('.parent');
let moves = 42;
let checkLinesWinnerPlayer1 = 0;
let checkLinesWinnerPlayer2 = 0;
let checkColumnsWinnerPlayer1 = 0;
let checkColumnsWinnerPlayer2 = 0;
let checkAscendingDiagonalsWinnerPlayer1 = 0;
let checkAscendingDiagonalsWinnerPlayer2 = 0;
let checkDescendingDiagonalsWinnerPlayer1 = 0;
let checkDescendingDiagonalsWinnerPlayer2 = 0;

for (let i = 0; i < rows; i++) {
    cells[i] = [];
    for (let j = 0; j < columns; j++) {
        const cell = document.createElement('div');
        cell.classList.add('child');
        parentDiv.appendChild(cell);
        cells[i][j] = cell;
    }
}

for (let i = cells.length - 1; i >= 0; --i) {
    const row = cells[i];
    for (let j = 0; j < row.length; ++j) {
        let cell = cells[i][j];
        cell.addEventListener('click', function() {
            if (i === cells.length - 1) {
                if (moves % 2 === 0 && cell.style.backgroundColor === "") {
                    cell.style.backgroundColor = 'red';
                    --moves;
                } else if (moves % 2 !== 0 && cell.style.backgroundColor === "") {
                    cell.style.backgroundColor = 'yellow';
                    --moves;
                }
            } else if (i < cells.length - 1) {
                if (moves % 2 === 0 && (cells[i + 1][j].style.backgroundColor === 'red' || cells[i + 1][j].style.backgroundColor === 'yellow') && cell.style.backgroundColor === "") {
                    cell.style.backgroundColor = 'red';
                    --moves;
                } else if (moves % 2 !== 0 && (cells[i + 1][j].style.backgroundColor === 'red' || cells[i + 1][j].style.backgroundColor === 'yellow') && cell.style.backgroundColor === "") {
                    cell.style.backgroundColor = 'yellow';
                    --moves;
                }
            }
            checkLines();
            checkColumns();
            checkAscendingDiagonals();
            checkDescendingDiagonals();
        });
    }
}

function checkLines() {
    for (let i = 0; i < rows; ++i) {
        checkLinesWinnerPlayer1 = 0;
        checkLinesWinnerPlayer2 = 0;
        for (let j = 0; j < columns; ++j) {
            if (cells[i][j].style.backgroundColor === "red") {
                ++checkLinesWinnerPlayer1;
                checkLinesWinnerPlayer2 = 0;
            } else {
                checkLinesWinnerPlayer1 = 0;
            }
            if (cells[i][j].style.backgroundColor === "yellow") {
                ++checkLinesWinnerPlayer2;
                checkLinesWinnerPlayer1 = 0;
            } else {
                checkLinesWinnerPlayer2 = 0;
            }
            checkWinner();
        }
    }
}

function checkColumns() {
    for (let j = 0; j < columns; ++j) {
        checkColumnsWinnerPlayer1 = 0;
        checkColumnsWinnerPlayer2 = 0;
        for (let i = 0; i < rows; ++i) {
            if (cells[i][j].style.backgroundColor === "red") {
                ++checkColumnsWinnerPlayer1;
                checkColumnsWinnerPlayer2 = 0;
            } else {
                checkColumnsWinnerPlayer1 = 0;
            }
            if (cells[i][j].style.backgroundColor === "yellow") {
                ++checkColumnsWinnerPlayer2;
                checkColumnsWinnerPlayer1 = 0;
            } else {
                checkColumnsWinnerPlayer2 = 0;
            }
            checkWinner();
        }
    }
}

function checkAscendingDiagonals() {
    for (let i = 3; i < rows; ++i) {
        for (let j = 0; j < columns - 3; ++j) {
            if (cells[i][j].style.backgroundColor === "red" &&
                cells[i - 1][j + 1].style.backgroundColor === "red" &&
                cells[i - 2][j + 2].style.backgroundColor === "red" &&
                cells[i - 3][j + 3].style.backgroundColor === "red") {
                checkAscendingDiagonalsWinnerPlayer1 = 4;
            }
            if (cells[i][j].style.backgroundColor === "yellow" &&
                cells[i - 1][j + 1].style.backgroundColor === "yellow" &&
                cells[i - 2][j + 2].style.backgroundColor === "yellow" &&
                cells[i - 3][j + 3].style.backgroundColor === "yellow") {
                checkAscendingDiagonalsWinnerPlayer2 = 4;
            }
        }
    }
    checkWinner();
}

function checkDescendingDiagonals() {
    for (let i = 3; i < rows; ++i) {
        for (let j = 3; j < columns; ++j) {
            if (cells[i][j].style.backgroundColor === "red" &&
                cells[i - 1][j - 1].style.backgroundColor === "red" &&
                cells[i - 2][j - 2].style.backgroundColor === "red" &&
                cells[i - 3][j - 3].style.backgroundColor === "red") {
                checkDescendingDiagonalsWinnerPlayer1 = 4;
            }
            if (cells[i][j].style.backgroundColor === "yellow" &&
                cells[i - 1][j - 1].style.backgroundColor === "yellow" &&
                cells[i - 2][j - 2].style.backgroundColor === "yellow" &&
                cells[i - 3][j - 3].style.backgroundColor === "yellow") {
                checkDescendingDiagonalsWinnerPlayer2 = 4;
            }
        }
    }
    checkWinner();
}

function checkWinner() {
    if (checkLinesWinnerPlayer1 === 4 || checkColumnsWinnerPlayer1 === 4 || checkAscendingDiagonalsWinnerPlayer1 === 4 || checkDescendingDiagonalsWinnerPlayer1 === 4) {
        document.getElementById("winner").innerText = "Player 1 won!";
        cells = [0];
        setTimeout(function() {
            location.reload();
        }, 2000);
    } else if (checkLinesWinnerPlayer2 === 4 || checkColumnsWinnerPlayer2 === 4 || checkAscendingDiagonalsWinnerPlayer2 === 4 || checkDescendingDiagonalsWinnerPlayer2 === 4) {
        document.getElementById("winner").innerText = "Player 2 won!";
        cells = [0];
        setTimeout(function() {
            location.reload();
        }, 2000);
    }
}
