import React, { Component } from "react";
import PropTypes from "prop-types";

import Email from "../Email";
import Password from "../Password";
import ErrorText from "../ErrorText";
import Submit from "../Submit";

import axios from "axios";
import API from "../../../config/api";
axios.defaults.withCredentials = true;
const loginAPI = `${API.users}/login`;

const initialState = {
    email: "",
    password: "",
    errorText: "",
    errorVisible: false
};

// Form to enter user credentials
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    // Shows error text to user
    showError(message) {
        this.setState({
            errorText: message,
            errorVisible: true
        });
    }

    // Callback that fires when login is pressed
    login() {
        axios.post(loginAPI, {
            email: this.state.email,
            password: this.state.password
        })
            .then(response => {
                response = response.data;
                if (response.ok) {
                    this.props.history.push("/main/");
                } else {
                    this.showError(response.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <label>
                    Email:
                    <Email name="email"
                           onChange={e => {
                                this.setState({
                                   errorVisible: false,
                                   email: e.target.value
                                });
                           }}
                           value={this.state.email}/>
                </label>
                <br/>
                <label>
                    Password:
                    <Password name="password"
                              onChange={e => {
                                    this.setState({
                                        errorVisible: false,
                                        password: e.target.value
                                    });
                              }}
                              value={this.state.password}/>
                </label>
                <br/>
                {this.state.errorVisible? <ErrorText value={this.state.errorText}/> : null}
                <Submit value="Submit"
                        onClick={this.login.bind(this)}/>
            </div>
        )
    }
}

LoginForm.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

export default LoginForm;