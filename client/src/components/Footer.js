import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => { 
  
  return (
    <div className="Footer">
        <footer>
            {/* basic footer with attributions and About Us links */}
            <h5>&copy;2020 | <Link to='/AboutUs'>About Us</Link> | <Link to='/Attributions'>Attributions</Link></h5>
        </footer>
    </div>
  )
}

export default Footer;