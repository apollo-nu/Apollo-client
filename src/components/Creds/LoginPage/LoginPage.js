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
      <div className="LoginPage">
        <LoginWrapper history={this.props.history}/>
        <input type="button"
               value="New User? Sign Up"
               onClick={this.moveToCreate.bind(this)}/>
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