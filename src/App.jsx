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

    CheckSquare(coords) {
        if (this.state.board[coords[1]][coords[0]] === 'U') {
            axios.post('/checkSpot', coords)
            .then((res) => {
                this.setState({
                    board : res.data
                });
            });
        }
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