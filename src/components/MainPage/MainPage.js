import React, { Component } from "react";
import PropTypes from "prop-types";
import PageHeader from "./PageHeader";
import PageBody from "./PageBody";

import axios from "axios";
import API from "../../config/api";
axios.defaults.withCredentials = true;
const pingAPI = `${API.users}/`;

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {id: ""};
  }

  // Pings the server and redirects to login if the jwt cookie is invalid
  componentWillMount() {
    axios.get(pingAPI)
      .then(response => {
          response = response.data;
        if (response.ok) {
          this.setState({id: response.body.id});
        } else {
          this.props.history.push("/login/");
        }
      })
      .catch(err => {
          console.log(err);
          this.props.history.push("/login/");
      })
  }

  render() {
    return (this.state.id?
          (<div className="MainPage">
            <PageHeader/>
            <PageBody id={this.state.id}/>
          </div>
          ) : null
    );
  }
}

MainPage.propTypes = {
  history: PropTypes.shape({
      push: PropTypes.func.isRequired
  })
};

export default MainPage;
