import React, { Component } from "react";
import PropTypes from "prop-types";
import MaterialIcon from "material-icons-react";

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTitles: [
                "Edit Years",
                "Log Out"
            ]
        };
    }

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
                {this.props.visible?
                    <div className="DropdownList"
                         id="dropdownList">
                        {this.state.listTitles.map((title, i) => (
                            <div className="DropdownListItem"
                                 id="dropdownListItem"
                                 key={i}>
                                {title}
                            </div>
                        ))}
                    </div>
                :null}
            </React.Fragment>
        )
    }
}

Dropdown.propTypes = {
    visible: PropTypes.bool,
    toggle: PropTypes.func
};

export default Dropdown;