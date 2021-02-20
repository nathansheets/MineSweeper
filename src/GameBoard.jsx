import React from 'react';
import GameSquare from './GameSquare.jsx';

const GameBoard = ({board, CheckSquare}) => {
    var boardStyle = {
        gridTemplateColumns: `repeat(${board.length}, 25px)`,
        gridTemplateRows: `repeat(${board[0].length}, 25px)`
    };

    function RenderBoard(board) {
        if (board && board.length > 1) {
            var outputBoard = [];
            var keyCounter = 0;
            board.map((row) => {
                row.map((column) => outputBoard.push(
                <GameSquare key={keyCounter} CheckSquare={CheckSquare} id={keyCounter++} status={column}/>
                ));
            });
            return outputBoard;
        } else {
            return (<div></div>)
        }
    };

    return (
        <div id="gameBoard" style={boardStyle}>
            {RenderBoard(board)}
        </div>
    );
}

export default GameBoard;