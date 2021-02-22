import React from 'react';

const GameSquare = ({CheckSquare, coords, status}) => {
    function ClickHandler() {
        CheckSquare(coords);
    }

    function SetClass(status) {
        if (typeof status === 'string') {
            return status;
        } else {
            return 'C';
        }
    }

    function RenderNumber(status) {
        if (typeof status === 'number') {
            return status;
        } else {
            return (<div></div>)
        }
    }

    return(
        <div className={SetClass(status)} onClick={ClickHandler}>
            {RenderNumber(status)}
        </div>
    )
}

export default GameSquare;