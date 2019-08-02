import React, { Component } from "react";
import PropTypes from "prop-types";
import LoginWrapper from "./LoginWrapper";

// Wrapper for the entire Login Page
class LoginPage extends Component {
  // Callback that redirects to createAccount page
  moveToCreate() {
    this.props.history.push("/createAccount/");
  }

  render() {
    return (
      <div className="AuthPage">
        <LoginWrapper history={this.props.history}/>
        <div className="NavText"
             onClick={this.moveToCreate.bind(this)}>
            New User? Sign Up
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};
  
export default LoginPage;