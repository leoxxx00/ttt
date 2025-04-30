const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Keeps track of the board state

// Function to handle clicks on the cells
function handleClick(event) {
    const index = event.target.getAttribute('data-cell-index');
    if (gameBoard[index] !== '' || message.textContent !== '') {
        return; // Ignore if the cell is already occupied or if the game is over
    }

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner(currentPlayer)) {
        message.textContent = `${currentPlayer} wins!`;
        return;
    }

    if (gameBoard.every(cell => cell !== '')) {
        message.textContent = "It's a draw!";
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to check if a player has won
function checkWinner(player) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => 
        pattern.every(index => gameBoard[index] === player)
    );
}

// Function to reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
    currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
