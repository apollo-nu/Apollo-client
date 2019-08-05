import React, { Component } from "react";
import PropTypes from "prop-types";

class DropdownList extends Component {
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
        );
    }
}

DropdownList.propTypes = {
    logout: PropTypes.func,
    toggle: PropTypes.func,
    visible: PropTypes.bool
};

export default DropdownList;