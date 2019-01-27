import React, {Component} from 'react'
import ScoreTable from './ScoreTable'

class Game extends Component {
    constructor(props){
        super(props)
        this.state = {
            playerName: '',
            deck: this.props.randomDeck,
            currentPlayer: 'House',
            turn: 0,
            players: 0,
            scores: 0,
            wins: 0,
            showCard: 0,
            blackJack: '',
            whowins: '',
        }
        this.data = {

        }
    }
    //Iniciallizes all scores and players
    handlePlayerNumbers = (e) => {
        var playersArr = []
        var scoresArr = []
        var winsArr = []
        debugger
        for(let i = 0; i < parseInt(e.target.value); i++){
            if(i === 0){
                playersArr.push('House')
            }
            else if(i === 1){
                playersArr.push(this.state.playerName)
            }
            else{
                playersArr.push('Player' + i)
            }
            scoresArr.push(0)
            winsArr.push(0)
        }
        debugger
        this.setState({players: playersArr, scores: scoresArr, wins: winsArr})
    }

    //Sets the username so the UI can be adjusted
    handlePlayerName = (e) => {
        this.setState({playerName: e.target.value})
    }
    //PLAYER METHODS -------------------------------------------------------------------------------------------


    hitMe = () =>{
        var deck = this.state.deck
        var card = deck[Math.floor(Math.random()*deck.length)]
        var scoresArr = this.state.scores
        var players = this.state.players
        var index = players.indexOf(this.state.currentPlayer)
        

        switch(card){
            case 'J':
                scoresArr[index] += 1                
                break;
            case 'Q':
                scoresArr[index] += 2
                break;
            case 'K':
                scoresArr[index] += 3
                break;
            case 'A':
                var value = this.askAs()
                scoresArr[index] += value
                break;
            default: 
                    scoresArr[index] += parseInt(card)
                break;
        }

        this.setState({scores: scoresArr, showCard: 'You got a' + parseInt(card)})
    }

    askAs = () => {
        this.setState({})
    }

    //NPC METHODS ---------------------------------------------------------------------------------------------

    //NPC turn
    npcTurn = () => {
        //If its last turn c
        //Analizing.-.
        this.throwCard()
        this.passTurn() //Passes turns and checks if some1 wins
        debugger
            
    }

    //NPC GETS A CARD
    throwCard = () => {
        //DEPENDS ON DECK//
        debugger
        var gameDeck = this.state.deck
        debugger
        var card = gameDeck[Math.floor(Math.random()*gameDeck.length)]
        var score = this.handleScore(card)

        //Recursion with this method, if score is less than 16
        if(score < 16){
            return this.throwCard()
        }
        else{
            var scoreArr = this.state.scores
            var players = this.state.players
            scoreArr[players.indexOf(this.state.currentPlayer)] = score
            this.passTurn()
        }
    }
    //Add and analyze the score
    handleScore = (card) => {

        var scoresArr = this.state.scores
        var players = this.state.players
        var playerToEdit = players.indexOf(this.state.currentPlayer)

        switch(card){
            case 'J':
                scoresArr[playerToEdit] += 1                
                break;
            case 'Q':
                scoresArr[playerToEdit] += 2
                break;
            case 'K':
                scoresArr[playerToEdit] += 3
                break;
            case 'A':
                if(scoresArr[playerToEdit] <= 20 && scoresArr[playerToEdit] > 10){
                    scoresArr[playerToEdit] += 11
                }
                else{
                    scoresArr[playerToEdit] += 1
                }
                break;
            default: 
                    scoresArr[playerToEdit] += parseInt(card)
                break;
        }
        this.setState({scores: scoresArr}, () => {
            if(scoresArr[playerToEdit] > 21){
               
               this.passTurn() 
            }
            else if(scoresArr[playerToEdit] === 21){
                this.isWin() //Insta Round Win
                this.passRound() //Next round, starting in house
                this.setState({blackjack: 'The house wins the round with a BlackJack'})
            }
            else{
                return scoresArr[playerToEdit] //Return score
             }
        }) 
       
    }

    //GENERAL METHODS ------------------------------------------------------------------------------------------------------
    //Pass to the next turn and checks who wins in the last turn
    passTurn = () => {
        debugger
        let turns = this.state.turn
        let current = this.state.players
        
        if(this.state.turn > this.state.players.length){
            let scoresArr = this.state.scores.map((e) => e = 0) //Reseting scores
            debugger
            this.checkWin(this.state.wins)
            this.setState({turn: 0, currentPlayer: current[0], scores: scoresArr})
        }
        else{
            debugger
            this.setState({turn: turns+1, currentPlayer: current[turns]})
        }
    }

    //Pass to next round because some1 has gotten a 21
    passRound = () => {
        this.setState({turn: 0, currentPlayer: 'House'})
    }
    //Method to assign a win to a player MUST BE USED WITH A PASSROUND
    isWin = () =>{
        var setWin = this.state.wins
        var index = this.state.players.indexOf(this.state.currentPlayer)
        setWin[index] += 1
    }
    //Check if some1 has 5 wins, that person wins the game
    checkWin = (arr) =>{
        arr.forEach((e, pos) => {
            var holder = e;
            var max = 0
            (holder > max ) ? max = holder : max = max
            if(max > 5){
                var winner = this.state.players[pos]
                this.setState({finishGame: true, whowins: winner})
            }
        })
    }
    //Rendering -----------------------------------------------------------------------------------------------------

    render(){
        //If there is more than 0 players
        if(this.state.players.length > 0){
            //If its users turn
            if(this.state.currentPlayer === this.state.playerName){
                debugger
                return(
                    <div>
                        <ScoreTable currentPlayer = {this.state.currentPlayer} players={this.state.players} scores = {this.state.scores}/>
                        <button onClick={this.hitMe}>Hit me!</button>
                        <button onClick={this.passTurn}>Pass turn</button>
                        <button onClick={this.props.saveGame}>Save Game</button>
                        <button onClick={this.props.mainMenu}> Exit main Menu</button>
                        <div>
                            <p>{this.state.showCard}</p>
                            <p>{this.state.blackJack}</p>
                        </div>
                    </div>
                )
            }
            //If its npc turn
            else{
                debugger
                this.npcTurn()
                return(
                    <div>
                        <ScoreTable currentPlayer = {this.state.currentPlayer} players={this.state.players} scores = {this.state.scores}/>
                        <div>
                            {this.state.npcAction}
                        </div>
                        <button onClick={this.props.mainMenu}> Exit main Menu</button>
                        <p>{this.state.blackJack}</p>
                    </div>
                )
            }
        }
        else if(this.state.finishGame == true){
            return(
                <div>
                    <ScoreTable currentPlayer = {this.state.currentPlayer} players={this.state.players} scores = {this.state.scores}/>
                    <p>The player {this.state.whowins} because he has more than 5 wins!</p>
                    <button onClick={this.props.mainMenu}>Go to main menu</button>
                </div>
            )
        }
        //Sort of main menu to choose players and your name
        else{
            return(
                <div>
                   <input onChange={this.handlePlayerNumbers} placeholder="How many players do you want?"></input>
                   <input onChange={this.handlePlayerName} placeholder="Your name here"></input>
                </div>
            )
        }
       
    }
}

export default Game