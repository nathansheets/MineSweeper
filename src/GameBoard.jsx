import React from 'react';
import GameSquare from './GameSquare.jsx';

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    RenderBoard() {
        if (this.props.board !== []) {
            return (
                this.props.board.map((row) => {
                    row.map((column) => {
                        <GameSquare />
                    })
                })
            )
        } else {
            return (<div></div>)
        }
    }

    render() {
        return (
            <div id="gameBoard">
                {this.RenderBoard.bind(this)}
            </div>
        )
    }
}

export default GameBoard;