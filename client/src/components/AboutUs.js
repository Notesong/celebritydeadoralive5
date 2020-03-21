import React from 'react';

const AboutUs = () => { 
  
  return (
    <div className="AboutUs">
        <header>
            <h2>About Us</h2>
        </header>
        {/* Display our information:  Image, name, position, and github links. */}
        <section className="everyone">
            <div className="individuals">
                <a href="https://github.com/DomBruno"><div className="dom"></div></a>
                <h3><a href="https://github.com/DomBruno">Dominick Bruno</a></h3>
                <h4>Node.js</h4>
            </div>
            <div className="individuals">
                <a href="https://github.com/bmoir23"><div className="brian"></div></a>
                <h3><a href="https://github.com/bmoir23">Brian Moir</a></h3>
                <h4>React</h4> 
            </div>
            <div className="individuals">
                <a href="https://github.com/Notesong"><div className="lee"></div></a>
                <h3><a href="https://github.com/Notesong">Lee Damien</a></h3>
                <h4>React</h4> 
            </div> 
        </section>
    </div>
  )
}

export default AboutUs;