import React, { Component } from "react";
import PropTypes from "prop-types";

class ErrorText extends Component {
    render() {
        return (
            <div className="ErrorText">
                {this.props.value}
            </div>
        );
    }
}

ErrorText.propTypes = {
    value: PropTypes.string
};

export default ErrorText;