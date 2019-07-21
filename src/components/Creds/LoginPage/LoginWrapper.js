import React, { Component } from "react";
import LoginForm from "./LoginForm";
import "../../../css/LoginWrapper.css";

// UI wrapper for the input form
class LoginWrapper extends Component {
  render() {
    return (
        <div>
          Log In:
          <LoginForm/>
        </div>
    );
  }
}

export default LoginWrapper;
