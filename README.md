Welcome to the assignment for Anchormen, this is a fully functional BlackJack game (21 card game) made with JavaScript.

##The following libraries are used:
	- Math (Front-end) -> Well you know what this is right?
	- Mongoose (Back end) -> MongoDB connections
	- Cors (Back end) -> Authentication, connection permissions
	- Path (Back end) -> Set Public paths
	- Axios (Ajax calls, Front-end) -> Axios does easy ajax calls and is promise compatible

The following FrameWorks are used:
	- ReactJS v16.7.0 (Front-end)
	- React-dom v16.7.0 (Front-end)
	- React-scripts v2.1.3 (Front-end)
	- ExpressJS v4.16.4 (Back-end)
	- NodeJS v11.1.0 (Both)
	*IMPORTANT*: !You need NODEJS to run the React Server!

The game is the following:

When you click start game, the game will start, leaving you in a "table" with a:
	- Dealer
	- Number of players you decided (up to 3)

The dealer will deal you a card, if you choose so, keep in mind that your goal is to achieve the highest number possible without exciding 21.
The other players will be dealed by the machine and they will make their own choices, although they will not know your score.

There is a couple of functionalities here:
	- Start Game -> You will start a new game. 
	- Deal -> The dealer will give you a card, if you achieve 21 or more, the turn will be skiped automatically.
	- Pass turn, -> you will be able to pass turn, although it will cost you the round. 
	- Skip turn -> (automatic functionality) (which will be emplyoed if you reach 21 or more)
	- Exit game -> You will exit the game without saving
	- Save game -> Will throw you to the main menu where you can choose whether to create a new one or load one. The scores of each player will be saved and when you return that will be the start 	  point.
	- Load game -> Will load a certain game you saved and start at that point. 

The save game functionality will save the data into a mongoDB database, loading will retrieve that data.
The other functionalities do not depend on a database.


Front End runs in: 'localhost:8080'
Back End runs in: 'localhost:5000'
MongoDB DB runs in: 'mongodb://localhost:27017/blackjackapp' --> Saves games 

NOTE: Both the front end and back end of this application is run by JavaScript. The PYTHON aplication will have the same contents but written with Python. 


Documentation:

You will need to install MongoDB in your computer, once you do that run the command "sudo service mongod start" to start using the database. Create a connection in 'localhost' port '27107' and a Database named 'blackjackapp', the directory to save games will create itself

Before running anything please run the command *npm install*, in both the folders of the front end and the back end, which will download all the necessary setup and libraries on both the Back-end and the Front-end.

To start the Backed ('localhost:5000')

	- Run Node or Nodemon *app.js*

To start the front end ('localhost:8080') <-- You have to access this one in the browser :P -->

	- Run *npm start*

NOTE: You also can download a Ducker package from the Ducker HUB repo thehunter896/blackjack:v2.0

Everything is set and you can play!

