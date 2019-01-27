import React from 'react'

const MainMenu = (props) => {
    return(
        <div>
            <ul>
                <li className="list-element" onClick={props.startGame}>Start Game</li>
                <li className="list-element" onClick={props.loadGame}>Load Game</li>
                <li className="list-element" onClick={window.close()}>Exit Game</li>
            </ul>
        </div>
    )
}

export default MainMenu