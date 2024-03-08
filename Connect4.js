const cells = [];
const rows = 6;
const columns = 7;
const parentDiv = document.querySelector('.parent');
let moves = 42;

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
    for (let j = 0; j < row.length; j++) {
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
            checkLinesWinner();
            checkColumnsWinner();
            checkAscendingDiagonalsWinner();
            checkDescendingDiagonalsWinner();
        });
    }
}

function checkLinesWinner() {
    for (let i = 0; i < rows; ++i) {
        let player1Won = 0;
        let player2Won = 0;
        for (let j = 0; j < columns; ++j) {
            if (cells[i][j].style.backgroundColor === "red") {
                ++player1Won;
                player2Won = 0;
            } else {
                player1Won = 0;
            }
            if (player1Won === 4) {
                alert("Player 1 won");
                return;
            }

            if (cells[i][j].style.backgroundColor === "yellow") {
                ++player2Won;
                player1Won = 0;
            } else {
                player2Won = 0;
            }
            if (player2Won === 4) {
                alert("Player 2 won");
                return;
            }
        }
    }
}

function checkColumnsWinner() {
    for (let j = 0; j < columns; ++j) {
        let player1Won = 0;
        let player2Won = 0;
        for (let i = 0; i < rows; ++i) {
            if (cells[i][j].style.backgroundColor === "red") {
                ++player1Won;
                player2Won = 0;
            } else {
                player1Won = 0;
            }
            if (player1Won === 4) {
                alert("Player 1 won");
                return;
            }

            if (cells[i][j].style.backgroundColor === "yellow") {
                ++player2Won;
                player1Won = 0;
            } else {
                player2Won = 0;
            }
            if (player2Won === 4) {
                alert("Player 2 won");
                return;
            }
        }
    }
}

function checkAscendingDiagonalsWinner() {
    for (let i = 3; i < rows; ++i) {
        for (let j = 0; j < columns - 3; ++j) {
            if (cells[i][j].style.backgroundColor === "red" &&
                cells[i - 1][j + 1].style.backgroundColor === "red" &&
                cells[i - 2][j + 2].style.backgroundColor === "red" &&
                cells[i - 3][j + 3].style.backgroundColor === "red") {
                alert("Player 1 won");
                return;
            }
            if (cells[i][j].style.backgroundColor === "yellow" &&
                cells[i - 1][j + 1].style.backgroundColor === "yellow" &&
                cells[i - 2][j + 2].style.backgroundColor === "yellow" &&
                cells[i - 3][j + 3].style.backgroundColor === "yellow") {
                alert("Player 2 won");
                return;
            }
        }
    }
}

function checkDescendingDiagonalsWinner() {
    for (let i = 3; i < rows; ++i) {
        for (let j = 3; j < columns; ++j) {
            if (cells[i][j].style.backgroundColor === "red" &&
                cells[i - 1][j - 1].style.backgroundColor === "red" &&
                cells[i - 2][j - 2].style.backgroundColor === "red" &&
                cells[i - 3][j - 3].style.backgroundColor === "red") {
                alert("Player 1 won");
                return;
            }
            if (cells[i][j].style.backgroundColor === "yellow" &&
                cells[i - 1][j - 1].style.backgroundColor === "yellow" &&
                cells[i - 2][j - 2].style.backgroundColor === "yellow" &&
                cells[i - 3][j - 3].style.backgroundColor === "yellow") {
                alert("Player 2 won");
                return;
            }
        }
    }
}
