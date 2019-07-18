import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MainPage from "./components/MainPage";
import LoginPage from "./components/LoginPage";

class App extends Component {
  render() {
    return (
      <Router>
          <Route path="/" exact component={MainPage}/>
          <Route path="/login/" component={LoginPage}/>
      </Router>
    );
  }
}

export default App;
