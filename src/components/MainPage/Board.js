import React, { Component } from "react";
import PropTypes from "prop-types";
import Row from "./Row";

class Board extends Component {
    render() {
        const columns = this.props.columns;
        return (
            <div className="Board">
                {Object.keys(columns).map((key, i) => <Row key={i}
                                                           id={i}
                                                           items={columns[key]}/>)}
            </div>
        );
    }
}

Board.propTypes = {
    columns: PropTypes.Object
};

export default Board;