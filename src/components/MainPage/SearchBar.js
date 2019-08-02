import React, { Component } from "react";
import PropTypes from "prop-types";

class SearchBar extends Component {
    render() {
        return (
            <input type="search"
                   placeholder="Search Courses"
                   className="SearchBar"
                   onChange={this.props.onChange}
                   value={this.props.value}/>
        )
    }
}

SearchBar.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
}

export default SearchBar;