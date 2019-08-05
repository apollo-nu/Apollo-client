import React, { Component } from "react";
import Dropdown from "./Dropdown";

class PageHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownVisible: false
        };
    }

    toggleDropdownVisible() {
        this.setState({dropdownVisible: !this.state.dropdownVisible});
    }

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
                <Dropdown visible={this.state.dropdownVisible}
                          toggle={this.toggleDropdownVisible.bind(this)}/>
            </div>
        )
    }
}

export default PageHeader;