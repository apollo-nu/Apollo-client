import React, { Component } from "react";
import PropTypes from "prop-types";
import Column from "./Column";

class SearchBody extends Component {
    render() {
        const column = this.props.column;
        return (
            <Column id="searchBody"
                    className="SearchBody"
                    items={column}/>
        )
    }
}

SearchBody.propTypes = {
    column: PropTypes.array
}

export default SearchBody;