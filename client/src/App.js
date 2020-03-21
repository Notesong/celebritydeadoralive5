
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Popup from "reactjs-popup";
// general components
import Nav from './components/Nav';
import Menu from "./components/Menu";
import BurgerIcon from "./components/BurgerIcon";
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import Attributions from './components/Attributions';
// quiz components
import QuizStart from './components/QuizStart';
import Quiz from './components/Quiz';
import Scoreboard from './components/Scoreboard';
// account components
import Register from './components/Register';
import Login from "./components/Login";
import Success from './components/Success';

// styles
import './App.css';
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  marginTop: "40px"
};
const contentStyle = {
  background: "rgba(255,255,255,0)",
  width: "80%",
  border: "none"
};

export const BASE_URL = `https://cdoa5-backend.herokuapp.com/`;


 export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div className="App" style={styles}>
      <header className="App-header">
        <h1>Celebrity Dead or Alive</h1>  
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      {/* Popup from: https://codesandbox.io/s/lpo41x20kq */}
      <Popup
        modal
        overlayStyle={{ background: "rgba(255,255,255,0.98" }}
        contentStyle={contentStyle}
        closeOnDocumentClick={false}
        trigger={open => <BurgerIcon open={open} />}
      >
        {close => <Menu close={close} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      </Popup>
      <div className="lower">
        <Switch>
          <Route exact path='/' component={QuizStart}/>
          <Route path='/Scoreboard' component={Scoreboard} />
          <Route path='/Quiz' render={routeProps => {return <Quiz {...routeProps} setIsLoggedIn={setIsLoggedIn} />;}} />
          <Route path='/Login' render={routeProps => {return <Login {...routeProps} setIsLoggedIn={setIsLoggedIn} />;}}/>
          <Route path='/Register' render={routeProps => {return <Register {...routeProps} setIsLoggedIn={setIsLoggedIn} />;}}/>
          <Route path='/Success' render={routeProps => {return <Success {...routeProps} isLoggedIn={isLoggedIn} />;}}/>
          <Route path='/AboutUs' component={AboutUs} />
          <Route path='/Attributions' component={Attributions} />
        </Switch>        
      </div>
      <Footer />
    </div>
  );
}