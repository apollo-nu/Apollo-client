import React, { Component } from "react";
import PropTypes from "prop-types";
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

Email.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default Email;