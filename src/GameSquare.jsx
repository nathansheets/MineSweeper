import React from 'react';

const GameSquare = ({CheckSquare, coords, status}) => {
    function ClickHandler(e) {
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
            var textColor;
            switch (status) {
                case 1: 
                    textColor = 'blue';
                    break;
                case 2: 
                    textColor = 'green';
                    break;
                case 3: 
                textColor = 'red';
                    break;
                case 4: 
                textColor = 'navy';
                    break;
                case 5: 
                textColor = 'maroon';
                    break;
                case 6: 
                textColor = 'black';
                    break;
                case 7: 
                textColor = 'black';
                    break;
                case 8: 
                textColor = 'black';
                    break;
            }
            
            return (
                <div style={{color: textColor}}>
                    {status}
                </div>
            );
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