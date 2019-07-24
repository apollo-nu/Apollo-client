import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import SearchBody from "./SearchBody";

const initialData = {
    searchValue: ""
};

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = initialData;
    }

    render() {
        return (
            <div className="Sidebar">
                <SearchBar onChange={this.props.onChange}
                           value={this.props.value}/>
                <SearchBody column={this.props.column}/>
            </div>
        )
    }
}

Sidebar.propTypes = {
    column: PropTypes.array
}

export default Sidebar;