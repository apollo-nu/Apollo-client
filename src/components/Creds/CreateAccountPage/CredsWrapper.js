import React, { Component } from "react";
import CreateForm from "./CreateForm";
import "../../../css/CredsWrapper.css";

// UI wrapper for the input form
class CredsWrapper extends Component {
  render() {
    return (
        <div>
          CreateAccount:
          <CreateForm/>
        </div>
    );
  }
}

export default CredsWrapper;
