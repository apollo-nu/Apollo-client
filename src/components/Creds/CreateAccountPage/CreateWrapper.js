import React, { Component } from "react";
import PropTypes from "prop-types";
import CreateForm from "./CreateForm";
import "../../../css/CreateWrapper.css";

// UI wrapper for the input form
class CreateWrapper extends Component {
  moveToLogin() {
    this.props.history.push("/login/");
  }

  render() {
    return (
        <div>
          Create Account:
          <CreateForm/>
          <input type="button"
                 value="Already have an account? Login"
                 onClick={this.moveToLogin.bind(this)}/>
        </div>
    );
  }
}

CreateWrapper.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default CreateWrapper;