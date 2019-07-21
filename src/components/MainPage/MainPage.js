import React, { Component } from "react";
import PropTypes from "prop-types";
import Board from "./Board";
import "../../css/MainPage.css";

import axios from "axios";
import API from "../../config/api";
axios.defaults.withCredentials = true;
const pingAPI = `${API.users}/`;

class MainPage extends Component {
  componentWillMount() {
    axios.get(pingAPI)
      .then(response => {
        response = response.data;
        if (response.ok) {
          sessionStorage.setItem("id", response.body.id);
        } else {
          sessionStorage.removeItem("id");
          this.props.history.push("/login/");
        }
      })
      .catch(err => {
          console.log(err);
          sessionStorage.removeItem("id");
          this.props.history.push("/login/");
      })
  }

  render() {
    return (
      <Board/>
    );
  }
}

MainPage.propTypes = {
  history: PropTypes.shape({
      push: PropTypes.func.isRequired
  })
};

export default MainPage;
