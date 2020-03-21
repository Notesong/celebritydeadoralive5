import React from 'react';
import Button from './Button';

const Scoreboard = () => {
  // retrieves name and games from storage
  let isNameHere = window.sessionStorage.getItem('registerUser')
  let games = JSON.parse(window.sessionStorage.getItem(isNameHere)) || []  
  
  if (isNameHere) { 
    return (
      <div className="scoreboard">
        <header>
          {/* displays general information about the player */}
          <h2>ALLLLL THE SCORES</h2>
          <h3>Player: {isNameHere}</h3>
          <div className="playagain">
            <h4>Play again to beat your own high score!</h4>
            <Button buttonText={'PLAY AGAIN'} pathName={'Quiz'} />
          </div>
        </header>
        <div className='board'>
          {/* scoreboard displays game number, score, and date played */}
          <div className='game'>
            <h4>GAME</h4>
            {/* displays the game number, based on how many games were played */}
            {games.map((game, i) => (
              <h5 key={game.score + i}>{i + 1}</h5>
            ))}
          </div>
          {/* displays the score for the current game */}
          <div className='score'>
            <h4>SCORE</h4>
            {games.map((game, i) => (
              <h5 key={game.score + i}>{game.score}</h5>
            ))}
          </div>
          {/* displays the date the current game was played */}
          <div className='date'>
          <h4>DATE</h4>
            {games.map((game, i) => (
              <h5 key={game.score + i}>{game.date}</h5>
            ))}
          </div>
        </div>
      </div>
    )}
  else {
    return (
      <div className="ScoreboardNotLoggedIn">
        <h2>Login to see your scoreboard!</h2>
      </div>
    )
  }
}

export default Scoreboard;