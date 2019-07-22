import React, { Component } from "react";
import PropTypes from "prop-types";
import LoginWrapper from "./LoginWrapper";

// Wrapper for the entire Login Page
class LoginPage extends Component {
  render() {
    return (
      <LoginWrapper history={this.props.history}/>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};
  
export default LoginPage;