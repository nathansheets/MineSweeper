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
        
    }

    GetBoard(boardSpecs) {
        axios.post('/board', boardSpecs)
        .then((board) => {
            this.setState({
                board: board.data
            });
        });
    }

    render() {
        return (
            <div id="AppContainer">
                <NavBar GetBoard={this.GetBoard.bind(this)}/>
                <GameBoard Board={this.state.board}/>
            </div>
        )
    }
}

export default App;