import React from 'react';
import { NavLink } from "react-router-dom";
import UserName from './UserName';

const QuizOver = (props) =>{
    // get quiz results from local storage
    const correctGuesses = sessionStorage.getItem('CorrectGuesses');
    const guesses = sessionStorage.getItem("TotalGuesses");

    // calculate score 
    // less points given based on how many were wrong to how many guesses
    let score = Math.floor(correctGuesses *(10 * (correctGuesses / guesses)));

    // if no score, set it to 0
    if (isNaN(score)) {
        score = 0;
    }

    let isNameHere = sessionStorage.getItem("registerUser") || "";
    sessionStorage.setItem('GameScore', JSON.stringify(score));

    // create date to store with score
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    
    // Store game
    if (isNameHere) {
        let oldGames = JSON.parse(sessionStorage.getItem(isNameHere)) || [];
        let newGame = { score: score, date: today};
        oldGames.push(newGame);
        sessionStorage.setItem( isNameHere, JSON.stringify(oldGames));
    }

    return(
        <div className='Quiz_over'>
            <div className="end">
                {/* Display results from quiz */}
                {isNameHere ? (
                    <h2>Way to go, {`${isNameHere}`}!</h2>
                ) :(
                    <h2>Way to Go!</h2>
                )}
                <h4>Correct Guesses: {correctGuesses}</h4>
                <h4>Total Guesses: {guesses}</h4>
                <h3>Score: {isNaN(score) ? 0 : score}</h3>
                <NavLink onClick={props.close} className="button" to="/Quiz">Close</NavLink>
            </div>
            <div className="signup_share">
                {isNameHere ? null : (
                    <div>
                        <h5>Brag to all your friends!</h5>
                        <h5>Sign up to save your scores:</h5>
                        {/* set user to be logged in */}
                        <UserName setIsLoggedIn={props.props.setIsLoggedIn} history={props.props.history} />
                    </div>    
                )}
                {/* help user post high score to Twitter */}
                <h4 className="twitter"><a className="twitter-share-button"
                    href={`https://twitter.com/intent/tweet?text=I%20scored%20${score}%20on%20CDoA`}
                    data-size="large">
                <i className="fab fa-twitter-square"></i><br />Tweet Your High Score!</a></h4>
            </div>

        </div>
    )
}
export default QuizOver;