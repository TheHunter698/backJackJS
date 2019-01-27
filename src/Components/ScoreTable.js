import React from 'react'

const ScoreTable = (props) => {
    debugger
    var list = props.players.map((e) => {
        if(e == props.currentPlayer){
            e = <td style={{backgroundColor: 'green'}}>{e}</td>
        }
        else{
            e = <td>{e}</td> 
        }
        return e
    })
    
    var scores = props.scores.map((e, pos) => {
        if(props.players.indexOf(props.currentPlayer) == pos){
            return e = <td style={{backgroundColor: 'green'}}>{e}</td>
        }
        else{
            e = <td>{e}</td>
        }   
        return e
    })
    var wins = props.wins.map((e) => {
        e = <td>{e}</td>
        return e
    })
    return(
        <div>
            <table>
                <tbody>
                    <tr>
                        {list}
                    </tr>
                    <tr>
                        {scores}    
                    </tr>
                    <tr>
                        {wins}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default ScoreTable