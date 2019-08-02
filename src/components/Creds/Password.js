import React, { Component } from "react";
import PropTypes from "prop-types";

// Password text form, may not need this as a separate component
class Password extends Component {
    render() {
        return (
            <input type="password"
                   className="AuthTextField"
                   name={this.props.name}
                   placeholder={this.props.placeholder}
                   onChange={this.props.onChange}
                   value={this.props.value}/>
        )
    }
}

Password.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default Password;