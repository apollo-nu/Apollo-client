import React, { Component } from "react";
import PropTypes from "prop-types";
import CreateWrapper from "./CreateWrapper";
import "../../../css/CreateAccountPage.css";

// Wrapper for the entire Create Account Page
class CreateAccountPage extends Component {
  render() {
    return (
      <CreateWrapper history={this.props.history}/>
    );
  }
}

CreateAccountPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default CreateAccountPage;
