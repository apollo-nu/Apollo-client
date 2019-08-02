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

const errorMap = email => {
    let map = {
        "email is required": "Missing Field(s).",
        "password is required": "Missing Field(s)",
        "Please enter a valid email address": "Invalid Email.",
        "Password is too short": "Invalid Credentials.",
        "Failed to validate user.": "Invalid Credentials."
    }
    map[`No user with email ${email} found.`] = "Invalid Credentials.";
    return map;
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
            errorText: errorMap(this.state.email)[message] || message,
            errorVisible: true
        });
    }

    onKeyDown(e) {
        if (e.key === "Enter") {
            this.login();
        }
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
            .catch(() => {
                this.showError("Something went wrong. Try again?");
            });
    }

    render() {
        return (
            <div className="AuthForm"
                 onKeyDown={e => this.onKeyDown(e)}>
                <Email name="email"
                        placeholder="Email Address"
                        onChange={e => {
                            this.setState({
                                errorVisible: false,
                                email: e.target.value
                            });
                        }}
                        value={this.state.email}/>
                <Password name="password"
                            placeholder="Password"
                            onChange={e => {
                                this.setState({
                                    errorVisible: false,
                                    password: e.target.value
                                });
                            }}
                            value={this.state.password}/>
                {this.state.errorVisible? <ErrorText value={this.state.errorText}/> : null}
                <Submit value="Log In"
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