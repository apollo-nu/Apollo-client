import React, { Component } from "react";
import PropTypes from "prop-types";
import PageHeader from "./PageHeader";
import PageBody from "./PageBody";

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
      <div>
        <PageHeader/>
        <PageBody/>
      </div>
    );
  }
}

MainPage.propTypes = {
  history: PropTypes.shape({
      push: PropTypes.func.isRequired
  })
};

export default MainPage;
