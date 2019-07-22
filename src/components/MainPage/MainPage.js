import React, { Component } from "react";
import PropTypes from "prop-types";
import PageHeader from "./PageHeader";
import PageBody from "./PageBody";

import axios from "axios";
import API from "../../config/api";
axios.defaults.withCredentials = true;
const pingAPI = `${API.users}/`;

/*
 * MainPage should render PageBody and PageHeader
 * PageBody should render a DroppableContext wrapping a Board and a Sidebar
 * 
 * Board should render a grid layout of Rows
 * Row should render a header and aDroppable that wraps Cards
 * Cards should render a Draggable
 * 
 * Sidebar should render a SearchBar and a SearchBody
 * SearchBar should render a search input
 * SearchBody should render a Row, which wraps Cards
 * 
 * PageHeader should wrap top logo, Board navigation, etc. (anything outside the DroppableContext)
 */

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
