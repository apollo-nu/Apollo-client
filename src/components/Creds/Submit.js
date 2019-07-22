import React, { Component } from "react";
import PropTypes from "prop-types";

// Email text form, may not need this as a separate component
class Submit extends Component {
    render() {
        return (
            <input type="button"
                   onClick={this.props.onClick}
                   value={this.props.value}/>
        )
    }
}

Submit.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string
};

export default Submit;