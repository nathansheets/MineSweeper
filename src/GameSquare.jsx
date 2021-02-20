import React from 'react';

const GameSquare = ({CheckSquare, id, status}) => {
    function ClickHandler() {
        CheckSquare(id);
    }

    return(
        <div className={status} onClick={ClickHandler}></div>
    )
}

export default GameSquare;