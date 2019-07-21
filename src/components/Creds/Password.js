import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../css/Password.css";

// Password text form, may not need this as a separate component
class Password extends Component {
    render() {
        return (
            <input type="password" 
                   name={this.props.name}
                   onChange={this.props.onChange}
                   value={this.props.value}/>
        )
    }
}

Password.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default Password;