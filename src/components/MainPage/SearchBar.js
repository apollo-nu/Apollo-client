import React, { Component } from "react";
import PropTypes from "prop-types";

class SearchBar extends Component {
    render() {
        return (
            <div>
                Search:
                <input type="search"
                       onChange={this.props.onChange}
                       value={this.props.value}/>
            </div>
        )
    }
}

SearchBar.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
}

export default SearchBar;