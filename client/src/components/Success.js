import React from 'react';

const Success = ({ isLoggedIn }) =>{

    let isNameHere = sessionStorage.getItem("registerUser") || "";

    return(
        <div className='success'>
            <h2>Success!</h2>
            {/* chooses message based on whether they're logged in */}
            { isLoggedIn && <h3>Welcome, {isNameHere}.</h3> }
            { !isLoggedIn && <h3>You've been logged out.</h3> }
        </div>
    )
}
export default Success;