//The components for the X players will be shown here for x <= 3

import React, { Component } from 'react';
import './App.css';
import LoadGame from './Components/LoadGame'
import MainMenu from './Components/MainMenu'
import Game from './Components/Game'
import axios from 'axios'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      startGame: false,
      loadGame: false,
      savedGames: {
        error: "",
      },
      fetchedGame: {
        
      },
      gameDeck: [],
    }
  }
  
  //Function to return to main menu
  mainMenu = () => {
    this.setState({loadGame: false, startGame: false})
  }
  //This loads from the DB all games you saved in the DB
  loadGame = () => {
    debugger
    this.setState({loadGame: true}, () => {
      axios('http://localhost:5000/savedGames', {
        method: 'GET',
        withCredentials: true,
      })
      .then(result => {
        console.log(result)
        debugger
        if(result.status === 201){
          debugger
          result = ""
          this.setState({
            error: 'No games saved.'
          })
        }
        else{
          this.setState({
            savedGames: {
              games: result.json()
            }
          })
        }
      })
      .catch((err) => console.log(err))
    })
  }
  //This will create a deck and start the game allowing the component to render
  startGame = () => {
    debugger
    //MIX DECKS HERE
    var deck = []
    for(let j = 0; j < 4; j++){
      for(let i = 0; i < 14; i++){
        if(i == 0){
          deck.push('A')
        }
        else if(i == 11){
          deck.push('J')
        }
        else if(i == 12){
          deck.push('Q')
        }
        else if(i == 13){
          deck.push('K')
        }
        else{
          deck.push(`${i}`)
        }
      }
    }
    debugger
    this.setState({gameDeck: deck, startGame: true})
  }
  //This will fetchData from a game you saved when you click a saved game slot
  fetchData = (e) => {
    this.setState({loadGame: false, startGame: true}, () => {
      axios(`localhost:5000/savedGames?game=${e.target.className}`, {
        withCredentials: true
      })
      .then((result) => {
        this.setState({fetchedGame: result})
      })
    })
  }
  //Render everything
  render() {
    if(this.state.loadGame){
      return(
        //Load game has props but not a logic of its own
        <div>
          <LoadGame savedGames = {this.state.savedGames} mainMenu = {this.mainMenu} fetchData = {this.fetchData}/>
        </div>
      )
    }
    else if(this.state.startGame){
      debugger
      return(
       //This is the game itself, its own component with logic, state and props
        <div>
          <Game randomDeck = {this.state.gameDeck} fetchedGame = {this.state.fetchedGame} mainMenu = {this.mainMenu}/>
        </div>
      )
    }
    else{
      //Component loaded to return to main menu will be present in game component aswell
      return (
        <div>
          <MainMenu loadGame = {this.loadGame} startGame = {this.startGame}/>
        </div>
       );
    }
    
  }
}

export default App;
