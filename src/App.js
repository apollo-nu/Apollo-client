import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";

import Controller from "./Controller";
import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/Creds/LoginPage/LoginPage";
import CreateAccountPage from "./components/Creds/CreateAccountPage/CreateAccountPage";

class App extends Component {  
  render() {
    return (
      <Router>
          <Route exact path="/" render={props => <Controller {...props}/>}/>
          <Route exact path="/main/" render={props => <MainPage {...props}/>}/>
          <Route exact path="/login/" render={props => <LoginPage {...props}/>}/>
          <Route exact path="/createAccount/" render={props => <CreateAccountPage {...props}/>}/>
      </Router>
    );
  }
}

export default App;
