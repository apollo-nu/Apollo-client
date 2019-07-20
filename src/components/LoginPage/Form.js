import React, { Component } from "react";
import Email from "./Email";
import Password from "./Password";
import Submit from "./Submit";
import "../../css/Form.css";

import axios from "axios";
import API from "../../config/api";
const createAccountAPI = `${API.users}/createAccount`;

// Form to enter user credentials
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    createAccount() {
        axios.post(createAccountAPI, this.state)
            .then(response => {
                response = response.data;
                if (!response.ok) {
                    console.log(response.message);
                } else {
                    console.log(response.body);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <label>
                    Email:
                    <Email name="email"
                           onChange={(e) => {
                               this.setState({email: e.target.value});
                           }}
                           value={this.state.email}/>
                </label>
                <br/>
                <label>
                    Password:
                    <Password name="password"
                              onChange={(e) => {
                                  this.setState({password: e.target.value});
                              }}
                              value={this.state.password}/>
                </label>
                <br/>
                <Submit value="Submit"
                        onClick={this.createAccount.bind(this)}/>
            </div>
        )
    }
}

export default Form;