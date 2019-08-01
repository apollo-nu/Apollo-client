import React, { Component } from "react";
import PropTypes from "prop-types";

import Email from "../Email";
import Password from "../Password";
import ErrorText from "../ErrorText";
import Submit from "../Submit";

import axios from "axios";
import API from "../../../config/api";
const createAccountAPI = `${API.users}/createAccount`;
const loginAPI = `${API.users}/login`;

const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
    errorText: "",
    errorVisible: false
};

// Form to enter user credentials
class CreateForm extends Component {
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

    // Callback that fires when create account is pressed
    createAccount() {
        const creds = {
            email: this.state.email,
            password: this.state.password
        }
        if (this.state.password === this.state.confirmPassword) {
            axios.post(createAccountAPI, creds)
                .then(response => {
                    response = response.data;
                    if (response.ok) {
                        this.login(creds);
                    } else {
                        this.showError(response.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.showError("Error 404");
                });
        } else {
            this.showError("Passwords must be equal");
        } 
    }

    // Logs user in if account was created successfully, otherwise bounces to login page
    login(creds) {
        axios.post(loginAPI, creds)
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
            });
    }

    render() {
        return (
            <div className="AuthForm">
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
                <Password name="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={e => {
                                this.setState({
                                    errorVisible: false,
                                    confirmPassword: e.target.value
                                });
                            }}
                            value={this.state.confirmPassword}/>
                {this.state.errorVisible? <ErrorText value={this.state.errorText}/>:null}
                <Submit value="Submit"
                        onClick={this.createAccount.bind(this)}/>
            </div>
        )
    }
}

CreateForm.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

export default CreateForm;