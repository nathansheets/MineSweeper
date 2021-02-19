import React from 'react';
import axios from 'axios';
import NavBar from './NavBar.jsx';
import GameBoard from './GameBoard.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            board : []
        };
    }

    componentDidMount() {
        this.GetBoard(10, 10, 1);
    }

    GetBoard(height, width, difficulty) {
        axios.post('/board', {
            height: height,
            width: width,
            difficulty: difficulty
        })
        .then((board) => {
            console.log(board);
            this.setState({
                board: board
            });
        });
    }

    render() {
        return (
            <div id="AppContainer">
                <NavBar />
                <GameBoard />
            </div>
        )
    }
}

export default App;