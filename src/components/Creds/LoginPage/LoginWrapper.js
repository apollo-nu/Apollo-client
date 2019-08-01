import React, { Component } from "react";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";

// UI wrapper for the input form
class LoginWrapper extends Component {
  render() {
    return (
        <div className="LoginWrapper">
          <div className="LoginForm">
            <LoginForm history={this.props.history}/>
          </div>
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
