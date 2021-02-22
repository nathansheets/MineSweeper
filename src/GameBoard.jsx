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
            for (let y = 0; y < board.length; y++) {
                for (let x = 0; x < board[0].length; x++) {
                    let coords = [x, y];
                    outputBoard.push(<GameSquare key={coords} CheckSquare={CheckSquare} coords={coords} status={board[y][x]}/>);
                }
            }
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