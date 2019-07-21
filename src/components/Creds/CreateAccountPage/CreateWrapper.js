import React, { Component } from "react";
import CreateForm from "./CreateForm";
import "../../../css/CreateWrapper.css";

// UI wrapper for the input form
class CreateWrapper extends Component {
  render() {
    return (
        <div>
          CreateAccount:
          <CreateForm/>
        </div>
    );
  }
}

export default CreateWrapper;
