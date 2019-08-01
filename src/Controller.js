import { Component } from "react";
import PropTypes from "prop-types";

import axios from "axios";
import API from "./config/api";
axios.defaults.withCredentials = true;
const pingAPI = `${API.users}/`;

class Controller extends Component {
    // Presents correct page based on presence of valid jwt cookie
    componentWillMount() {
        axios.get(pingAPI)
            .then(response => {
                response = response.data;
                if (response.ok) {
                    this.props.history.push("/main/");
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
        return null;
    }
}

Controller.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

export default Controller;