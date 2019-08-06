import React, { Component } from "react";
import PropTypes from "prop-types";
import MaterialIcon from "material-icons-react";

class Dropdown extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="Dropdown"
                     id="dropdown"
                     onClick={this.props.toggle}>
                    <MaterialIcon icon="reorder"
                                  size="50"
                                  id="dropdown"
                                  invert/>
                </div>
            </React.Fragment>
        )
    }
}

Dropdown.propTypes = {
    toggle: PropTypes.func
};

export default Dropdown;