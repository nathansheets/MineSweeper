import React from 'react';
import axios from 'axios';
import NavBar from './NavBar.jsx';
import GameBoard from './GameBoard.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            board : [[]]
        };
    }

    componentDidMount() {
        // Standard Board
        this.GetBoard({
            height: 10,
            width: 10,
            difficulty: 1
        });
    }

    GetBoard(boardSpecs) {
        axios.post('/board', boardSpecs)
        .then((res) => {
            this.setState({
                board: res.data
            });
        });
    }

    CheckSquare(squareID) {
        var coords = IDtoCoords(squareID, this.state.board.length);
        
        axios.post('/checkSpot', coords)
        .then((res) => {
            var tempBoard = this.state.board;
            tempBoard[coords.y][coords.x] = res.data ? 'C' : 'B'; // c for clear, b for bomb...
            this.setState({
                board : tempBoard
            });
        });
    }

    render() {
        return (
            <div id="AppContainer">
                <NavBar GetBoard={this.GetBoard.bind(this)} />
                <GameBoard board={this.state.board} CheckSquare={this.CheckSquare.bind(this)}/>
            </div>
        )
    }
}

function IDtoCoords(squareID, boardLength) {
    var coords = {
        x : 0,
        y : 0
    };

    while (squareID >= boardLength) {
        squareID -= boardLength;
        coords.y++;
    }
    coords.x = squareID;
    return coords;
}

export default App;