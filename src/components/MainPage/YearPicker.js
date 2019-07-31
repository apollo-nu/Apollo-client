import React, { Component } from "react";
import PropTypes from "prop-types";

class YearPicker extends Component {
    render() {
        return (
            <div className="YearPicker">
                <input type="button"
                       onClick={this.props.onSubmit}
                       value="Create Board"/>
            </div>
        )
    }
}

YearPicker.propTypes = {
    onSubmit: PropTypes.func
}

export default YearPicker;