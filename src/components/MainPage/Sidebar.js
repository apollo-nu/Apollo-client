import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import SearchBody from "./SearchBody";

class Sidebar extends Component {
    render() {
        return (
            <div className="Sidebar">
                <SearchBar/>
                <SearchBody column={this.props.column}/>
            </div>
        )
    }
}

Sidebar.propTypes = {
    column: PropTypes.array
}

export default Sidebar;