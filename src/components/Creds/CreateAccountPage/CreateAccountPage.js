import React, { Component } from "react";
import PropTypes from "prop-types";
import CreateWrapper from "./CreateWrapper";

// Wrapper for the entire Create Account Page
class CreateAccountPage extends Component {
  moveToLogin() {
    this.props.history.push("/login/");
  }

  render() {
    return (
      <div className="AuthPage">
        <CreateWrapper history={this.props.history}/>
        <input type="button"
                   value="Already have an account? Login"
                   onClick={this.moveToLogin.bind(this)}/>
      </div>
    );
  }
}

CreateAccountPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default CreateAccountPage;
