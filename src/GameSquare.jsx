import React from 'react';

const GameSquare = ({CheckSquare, id}) => {
    function ClickHandler() {
        CheckSquare(id);
    }
    return(
        <div className="gameSquare" onClick={ClickHandler}>

        </div>
    )
}

export default GameSquare;