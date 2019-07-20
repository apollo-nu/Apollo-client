import React, { Component } from "react";
import "../../css/Email.css";

// Email text form, may not need this as a separate component
class Email extends Component {
    render() {
        return (
            <input type="email" 
                   name={this.props.name}
                   onChange={this.props.onChange}
                   value={this.props.value}/>
        )
    }
}

export default Email;