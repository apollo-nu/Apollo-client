import React, { Component } from "react";
import PropTypes from "prop-types";
import Row from "./Row";

class SearchBody extends Component {
    render() {
        const column = this.props.column;
        return (
            <Row id={"searchBody"}
                 items={column}/>
        )
    }
}

SearchBody.propTypes = {
    column: PropTypes.array
}

export default SearchBody;