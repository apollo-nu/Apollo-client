import React, { Component } from "react";

class PageHeader extends Component {
    render() {
        return (
            <div className="PageHeader">
                <img src={require("../../img/logo.png")}
                     className="HeaderLogo"
                     alt="Logo"/>
                <img src={require("../../img/name.png")}
                     className="HeaderName"
                     alt="Apollo"/>
            </div>
        )
    }
}

export default PageHeader;