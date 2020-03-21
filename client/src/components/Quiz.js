import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Popup from "reactjs-popup";
import CelebCard from './CelebCard';
import QuizOver from './QuizOver'
// import Timebar from "./Timebar";

const contentStyle = {
  // background: "rgba(255,255,255,0)",
};

const Quiz = (props) => {
  // celeb data
  const [data, setData] = useState([])
  // current celeb
  const [currentCeleb, setCurrentCeleb] = useState({id: 10, name: "Nichelle Nichols", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Nichelle_Nichols_by_Gage_Skidmore.jpg/220px-Nichelle_Nichols_by_Gage_Skidmore.jpg", isDead: "false"})
  // current ID
  const [id, setId] = useState(0)
  // sets score
  const [score, setScore] = useState(0)
  const [userAnswer, setUserAnswer] = useState(0)
  // for timer
  const [time, setTime] = useState(false)

  // Grab the celebrity data from the backend API and save to data
  useEffect(() => {
    axios
    .get(
    `https://cdoa5-backend.herokuapp.com/api/celebs/`
    )
    .then((e) => {
      e.status ? setData(e.data): console.log("thumbs up")
    })
    .catch((err) => {
      console.log("Error fetching data", err)
    })
  }, [])

  // timer set for 30secs but we can decide on timer later
  useEffect(() => {
    const timer = setTimeout(() => setTime(true), 15000)
    return () => clearTimeout(timer)
  }, [])

  //  now we check and see if the user guessed dead here
  // Adjusts score appropriately
  const isDead = () => {
    if (currentCeleb.isDead === "true") {
      setScore(score + 1)
    }
    finalizeAnswer()
  }

  // checks and sees if the celeb is Alive
  // Adjusts score appropriately
  const isAlive = () => {
    if (currentCeleb.isDead === "false") {
      setScore(score + 1)
    } 
    finalizeAnswer()
  }

  // change the current celeb
  const changeCeleb = () => {
    setCurrentCeleb(data[id])
    // loop through celebs
    if (id === data.length - 1) {
      setId(0)
    } else {
      setId(id + 1)
    }
  }

  // refresh the page if player wants to play again
  function refreshPage() {
    window.location.reload(false);
  }
  
  // update number of answers and changes the current celeb
  const finalizeAnswer = () => {
    setUserAnswer(userAnswer + 1)
    changeCeleb()
  }

  window.sessionStorage.setItem('CorrectGuesses', JSON.stringify(score))
  window.sessionStorage.setItem('TotalGuesses', JSON.stringify(userAnswer))

  return (
  //  whole game (will need to set up data points i.e (death and alive from API)
    <div className='game-quiz'>
      <Route
      path='/Quiz'
      render={() =>
        time ? (
          // after time is up...
          // this section displays buttons to get score and to play again
          // if get score button is pressed, a modal pops up
          <div className="times-up">
            <div className='p-content'>
              <div className='score-status'>
                {/* Displays the score */}
                <h3>Guesses: &nbsp;&nbsp; {userAnswer}</h3>
                <h3>Correct: &nbsp;&nbsp; {score}</h3>
              </div>
              <h2><i className="fad fa-alarm-exclamation"></i></h2>
              <h2>Time's up!</h2>
            </div>
            {/* popup modal to display final score and Twitter button */}
            <Popup
              modal
              contentStyle={contentStyle}
              closeOnDocumentClick={true}
              trigger={<button className="button large">See Your Score</button>}
            >
              {close => <QuizOver props={props} close={close} />}
            </Popup>
            <button onClick={refreshPage} className="button large">Play Again</button>
          </div>
        ) : (
          <div className='p-content'>
            <div className='score-status'>
              {/* Displays the score */}
              <h3>Guesses: &nbsp;&nbsp; {userAnswer}</h3>
              <h3>Correct: &nbsp;&nbsp; {score}</h3>
            </div>
            {/* <Timebar /> */}
            <div className='quiz-main-panel'>
              {/* Displays the current celebrity */}
              {data.length > 0 ? <CelebCard currentCeleb={currentCeleb} /> : <div>Loading...</div>}
              <div>
                {/* Dead or Alive buttons */}
                <button className='button large' onClick={()=> isDead()}>Dead</button>
                <button className='button large' onClick={()=> isAlive()}>Alive</button>
              </div>
            </div>
          </div>
        )
      }
      />
    </div>
  )
}

export default Quiz;