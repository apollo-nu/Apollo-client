import React, { Component } from "react";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import "../../../css/LoginWrapper.css";

// UI wrapper for the input form
class LoginWrapper extends Component {
  moveToCreate() {
    this.props.history.push("/createAccount/");
  }

  render() {
    return (
        <div>
          Log In:
          <LoginForm/>
          <input type="button"
                 value="Create Account"
                 onClick={this.moveToCreate.bind(this)}/>
        </div>
    );
  }
}

LoginWrapper.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default LoginWrapper;
