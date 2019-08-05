import React, { Component } from "react";
import PropTypes from "prop-types";
import MaterialIcon from "material-icons-react";
import DropdownList from "./DropdownList";

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
                <DropdownList visible={this.props.visible}
                              toggle={this.props.toggle}
                              logout={this.props.logout}/>
            </React.Fragment>
        )
    }
}

Dropdown.propTypes = {
    logout: PropTypes.func,
    toggle: PropTypes.func,
    visible: PropTypes.bool
};

export default Dropdown;