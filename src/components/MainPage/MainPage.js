import React, { Component } from "react";
import Board from "./Board";
import PropTypes from "prop-types";
import "../../css/MainPage.css";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.props.history.push("/createAccount/");
  }

  render() {
    return (
      <Board>
      </Board>
    );
  }
}

MainPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default MainPage;
