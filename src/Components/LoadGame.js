//This component will load so you can choose the game you want, it will be a list of saved games.

import React from 'react'


const LoadGame = (props) => {
    //The classname is the ID of the game
    var listMapped;
    if(false){
        listMapped = [];
    }
    else{
        listMapped = []
    }
    return(
        <div>
            {listMapped}
            <button onClick={props.mainMenu}>Exit to Menu</button>
        </div>
        
    )
}

export default LoadGame