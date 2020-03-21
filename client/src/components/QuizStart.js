import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import logo from '../images/heartbeat.png'

const Image = styled.div`
    background-image: url(${logo});
    background-repeat: no-repeat;
	background-size: contain;
    background-position: center; 
    height: 200px;
    margin: 1rem 0;
    @media only screen and (max-width: 600px) {
        height: 100px;
    }
`;

const QuizStart = () => {
    // checks if user is logged in. Will use name below if they are
    let isNameHere = window.sessionStorage.getItem("registerUser") || ""

    return (
        <div className='Quiz_Start'>
            {/* displays general information about the quiz */}
            <header>
                <Image />
                <h3>Guess which of these Celebs are Dead or Alive!</h3>
                <h4>You have 15 seconds.</h4>
                {isNameHere === "" ? null : <h3> Let's Begin, {isNameHere}!</h3>}
            </header>
            {/* button to start quiz */}
            <div className="begin_button">
                <Button buttonText={'Press Here to Begin!'} pathName={'Quiz'} />
            </div>
        </div>
    )
}

export default QuizStart;
