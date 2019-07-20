import React, { Component } from "react";
import Form from "./Form";
import "../../css/Creds.css";

// UI wrapper for the input form
class Creds extends Component {
  render() {
    return (
        <div>
          Please enter your credentials:
          <Form/>
        </div>
    );
  }
}

export default Creds;
