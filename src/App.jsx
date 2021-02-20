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
        var coords = {
            x : 0,
            y : 0
        };

        while (squareID >= this.state.board.length) {
            squareID -= this.state.board.length;
            coords.y++;
        }
        coords.x = squareID;
        
        axios.post('/checkSpot', coords)
        .then((res) => {
            var tempBoard = this.state.board;
            tempBoard[coords.y][coords.x] = res.data ? 'c' : 'b'; // c for clear, b for bomb...
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

export default App;