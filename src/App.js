import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/LoginPage/LoginPage";

class App extends Component {  
  render() {
    return (
      <Router>
          <Route exact path="/" render={props => <MainPage {...props}/>}/>
          <Route exact path="/login/" render={props => <LoginPage {...props}/>}/>
      </Router>
    );
  }
}

export default App;
