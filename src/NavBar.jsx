import React from 'react';

class NavBar extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            height: 10,
            width: 10,
            difficulty: 1
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    handleSubmit(event) {
        this.props.GetBoard(this.state);
        event.preventDefault();
    }

    render() {
        return(
            <div id="navBar">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Height: 
                        <input type="number" name="height" value={this.state.height} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Width: 
                        <input type="number" name="width" value={this.state.width} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Difficulty:
                        <select value={this.state.difficulty} name="difficulty" onChange={this.handleChange}>
                            <option value="0.5">Easy</option>
                            <option value="1">Normal</option>
                            <option value="1.5">Hard</option>
                            <option value="2">Insane</option>
                            <option value="2.5">Impossible</option>
                        </select>
                    </label>
                    <br />
                    <button>
                        Start Game
                    </button>
                </form>
            </div>
        )
    }
}

export default NavBar;