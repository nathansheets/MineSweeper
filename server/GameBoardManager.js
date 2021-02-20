var board;

module.exports.GenerateBoard = ({height, width, difficulty})  => {
    board = [];
    // Generate base board
    for (let rows = 0; rows < width; rows++) {
        let column = [];
        for (let columns = 0; columns < height; columns++) {
            // U for unchecked
            column.push('U');
        }
        board.push(column);
    }

    // Generate copy of board to send to client without mines.
    // This is because we don't want client to be able to use dev tools to cheat.
    var clientBoard = [];
    for (let row of board) {
        clientBoard.push(row.slice());
    }

    // Add Mines
    var totalMines = Math.floor(((height * width) / 10) * difficulty);
    for (let mineCount = 0; mineCount < totalMines; mineCount++) {
        let row = getRandomInt(height);
        let column = getRandomInt(width);
        if (board[column][row] === 'U') {
            board[column][row] = 'B';
        } else {
            mineCount--;
        }
    }

    return clientBoard;
}

module.exports.CheckSpot = (coords) => {
    return board[coords.y][coords.x] === 'U';
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}