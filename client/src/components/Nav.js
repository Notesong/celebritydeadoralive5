import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {

  // reset everything for logout
  function logout() {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('registerUser');
    setIsLoggedIn(false);
  }

  return (
    <nav id="nav">
      {/* navbar for the website. Mobile version is in Menu.js */}
      <Link to='/'>Home</Link>
      <Link to='/Quiz'>Quiz</Link>
      { isLoggedIn && <Link to='/Scoreboard'>Scoreboard</Link> }
      { isLoggedIn && <Link to='/Success'><button className='button small' onClick={()=> logout()}>Logout</button></Link> }
      { !isLoggedIn && <Link to='/Login'><span className="button small">Login</span></Link> }
      { !isLoggedIn && <Link to='/Register'><span className="button small alt">Signup</span></Link> }
    </nav>
  )
}

export default Nav;