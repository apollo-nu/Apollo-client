import React, { Component } from "react";
import PropTypes from "prop-types";

import Email from "../Email";
import Password from "../Password";
import ErrorText from "../ErrorText";
import Submit from "../Submit";

import axios from "axios";
import API from "../../../config/api";
const createAccountAPI = `${API.users}/createAccount`;

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

    showError(message) {
        this.setState({
            errorText: message,
            errorVisible: true
        });
    }

    createAccount() {
        if (this.state.password === this.state.confirmPassword) {
            axios.post(createAccountAPI, {
                email: this.state.email,
                password: this.state.password
            })
                .then(response => {
                    response = response.data;
                    if (response.ok) {
                        this.props.history.push("/login/");
                    } else {
                        this.showError(response.message);
                    }
                })
                .catch(err => {
                    this.showError(err);
                });
        } else {
            this.showError("Passwords must be equal");
        } 
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
                <label>
                    Confirm Password:
                    <Password name="confirmPassword"
                              onChange={e => {
                                    this.setState({
                                        errorVisible: false,
                                        confirmPassword: e.target.value
                                    });
                              }}
                              value={this.state.confirmPassword}/>
                </label>
                <br/>
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