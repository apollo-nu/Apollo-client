import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropdown from "./Dropdown";

class PageHeader extends Component {
    render() {
        return (
            <div className="PageHeader">
                <div className="LogoWrapper">
                    <img src={require("../../img/logo.png")}
                        className="HeaderLogo"
                        alt="Logo"/>
                    <img src={require("../../img/name.png")}
                        className="HeaderName"
                        alt="Apollo"/>
                </div>
                <Dropdown visible={this.props.dropdownVisible}
                          toggle={this.props.toggle}/>
            </div>
        )
    }
}

PageHeader.propTypes = {
    dropdownVisible: PropTypes.bool,
    toggle: PropTypes.func
};

export default PageHeader;