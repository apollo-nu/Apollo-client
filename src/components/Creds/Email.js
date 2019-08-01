import React, { Component } from "react";
import PropTypes from "prop-types";

// Email text form, may not need this as a separate component
class Email extends Component {
    render() {
        return (
            <input type="email"
                   className="AuthTextField"
                   name={this.props.name}
                   placeholder={this.props.placeholder}
                   onChange={this.props.onChange}
                   value={this.props.value}/>
        )
    }
}

Email.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default Email;