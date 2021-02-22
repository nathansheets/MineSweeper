const { cli } = require("webpack");

var board, clientBoard, numberBoard;
// Board will be used to keep track of bombs
// ClientBoard will be used to abstract away certain info from client
// NumberBoard will keep track of nearby bombs per tile

var tilesLeft;

module.exports.GenerateBoard = ({height, width, difficulty})  => {
    tilesLeft = height * width;
    board = [];
    // Generate base board
    for (let y = 0; y < height; y++) {
        let row = [];
        for (let x = 0; x < width; x++) {
            // U for unchecked
            row.push('U');
        }
        board.push(row);
    }

    // Generate copy of board to send to client without mines.
    // This is because we don't want client to be able to use dev tools to cheat.
    clientBoard = [];
    for (let row of board) {
        clientBoard.push(row.slice());
    }

    // Add Mines
    var totalMines = Math.floor(((height * width) / 10) * difficulty);
    tilesLeft -= totalMines;
    for (let mineCount = 0; mineCount < totalMines; mineCount++) {
        let y = getRandomInt(height);
        let x = getRandomInt(width);
        if (board[y][x] === 'U') {
            board[y][x] = 'B';
        } else {
            mineCount--;
        }
    }

    // Generate numbers per square once to save processing later
    numberBoard = [];
    for (let y = 0; y < height; y++) {
        let newRow = [];
        for (let x = 0; x < width; x++) {
            newRow.push(GetNearbyBombs(x, y));
        }
        numberBoard.push(newRow);
    }
    
    return clientBoard;
}

module.exports.CheckSpot = (coords) => {
    var x = coords[0];
    var y = coords[1];

    // Check if spot is bomb/game over
    if (!IsClearSpot(x, y)) {
        return GameOverBoard();
    }

    if (tilesLeft === 1) {
        console.log('Win!');
    }

    ClearAdjSpots(x, y);

    return clientBoard;
}

// Generate board that shows where bombs were
const GameOverBoard = () => {
    var gameOverBoard = [];
    for (let y = 0; y < board.length; y++) {
        let newRow = [];
        for (let x = 0; x < board[0].length; x++) {
            // Gameover -> show client where bombs were
            newRow.push(board[y][x] === 'B' ? 'B' : null);
        }
        gameOverBoard.push(newRow);
    }
    return gameOverBoard;
}

// Recursively clear spots up/right/down/left
const ClearAdjSpots = (x, y) => {
    if (IsWithinRange(x, y)) {
        let nearbyBombs = numberBoard[y][x];

        if (clientBoard[y][x] === 'U' && nearbyBombs === 'C') {
            clientBoard[y][x] = 'C';
            tilesLeft--;
    
            ClearAdjSpots(x + 1, y);
            ClearAdjSpots(x - 1, y);
            ClearAdjSpots(x, y + 1);
            ClearAdjSpots(x, y - 1);
            return;
        } else if (clientBoard[y][x] === 'U') {
            tilesLeft--;
        }
        clientBoard[y][x] = nearbyBombs;
    }
}

// Get number of bombs of spot and clear surrounding
const GetNearbyBombs = (x, y) => {
    var numBombs = 0;
    for (let row = -1; row <= 1; row++) {
        for (let col = -1; col <= 1; col++) {
            if (row !== 0 || col !== 0) {
                let newCol = x + col;
                let newRow = y + row;
                if (IsWithinRange(newCol, newRow) && !IsClearSpot(newCol, newRow)) {
                    numBombs++;
                }
            }
        }
    }
    return numBombs === 0 ? 'C' : numBombs;
}

// Clears spot if not bomb, false if not clear (bomb)
const IsClearSpot = (x, y) => {
    if (board[y][x] === 'B') {
        return false;
    } else {
        return true;
    }
}

// Check if spot exists
const IsWithinRange = (x, y) => {
    return (x >= 0 && y >= 0 && x < board[0].length && y < board.length);
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}