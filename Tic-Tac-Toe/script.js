const gameBoard = (() => {
    const board = Array(9).fill("");

    const addToBoard = (icon, pos) => {
        if (board[pos] === "") {
            board[pos] = icon;
            return true;
        }
        return false;
    }   

    const getBoard = () => board;

    const hasWon = (patterns, icon) => patterns.some(pattern => pattern.every(index => board[index] === icon));

    const isDraw = () => !board.includes("");

    const resetBoard = () => board.fill("");
    
    return {getBoard, addToBoard, resetBoard, hasWon, isDraw};
})();

function createPlayer (name, icon) {
    return {name, icon};
}

const gameFlow = (() => {
    const playerOne = createPlayer("Player One", "X");
    const playerTwo = createPlayer("Player Two", "O");
    const status = document.getElementById("status");
    let currentPlayer = playerOne;
    let runGame = true;

    const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    const switchPlayer = () => currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;


    const playGame = () => {
        const handleMove = (pos) => {
            if (!runGame || !gameBoard.addToBoard(currentPlayer.icon, pos)) return;
    
            renderBoard();
    
            if (gameBoard.hasWon(winningPatterns, currentPlayer.icon)) {
                status.textContent = `${currentPlayer.name} has won!`;
                runGame = false;
                return;
            }
    
            if (gameBoard.isDraw()) {
                status.textContent = "It's a tie!";
                runGame = false;
                return;
            }
    
            switchPlayer();
            status.textContent = `${currentPlayer.name}'s turn (${currentPlayer.icon})`;
        };
    
        const renderBoard = () => {
            const board = document.getElementById("board");
            board.innerHTML = "";
            gameBoard.getBoard().forEach((cell, index) => {
                const cellElement = document.createElement("div");
                cellElement.classList.add("cell");
                if (cell !== "") {
                    cellElement.textContent = cell;
                    cellElement.classList.add("taken");
                } else {
                    cellElement.addEventListener("click", () => handleMove(index));
                }
                board.appendChild(cellElement);
            });
        };

        document.getElementById("restart").addEventListener("click", () => {
            gameBoard.resetBoard();
            runGame = true;
            currentPlayer = playerOne;
            status.textContent = "Player One's turn (X)";
            renderBoard();
        });
    
        renderBoard();
    };

    return {playGame};
})();

gameFlow.playGame();