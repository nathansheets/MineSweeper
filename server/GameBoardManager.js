var board;

module.exports.GenerateBoard = ({height, width, difficulty})  => {
    board = [];
    // Generate base board
    for (let rows = 0; rows < width; rows++) {
        let column = [];
        for (let columns = 0; columns < height; columns++) {
            column.push(0);
        }
        board.push(column);
    }

    var totalMines = Math.floor(((height * width) / 10) * difficulty);

    for (let mineCount = 0; mineCount < totalMines; mineCount++) {
        let row = getRandomInt(height);
        let column = getRandomInt(width);
        if (board[row][column] === 0) {
            board[row][column] = 1;
        } else {
            mineCount--;
        }
    }
    return board;
}

module.exports.CheckSpot = ({xCoord, yCoord}) => {
    return board[yCoord][xCoord];
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}