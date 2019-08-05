import React, { Component } from "react";
import PropTypes from "prop-types";
import MaterialIcon from "material-icons-react";

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: [
                {
                    title: "Edit Years",
                    onClick: null
                },
                {
                    title: "Log Out",
                    onClick: this.props.logout
                }
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
                        {this.state.listItems.map((item, i) => (
                            <div className="DropdownListItem"
                                 id="dropdownListItem"
                                 key={i}
                                 onClick={item.onClick}>
                                {item.title}
                            </div>
                        ))}
                    </div>
                :null}
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