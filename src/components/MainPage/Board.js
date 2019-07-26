import React, { Component } from "react";
import PropTypes from "prop-types";
import Column from "./Column";

const COLUMN_COUNT = 4;

class Board extends Component {
    render() {
        const columns = this.props.columns;
        const keys = Object.keys(columns);
        return (
            <div className="Board">
                {keys.map((key, i) => <Column key={i}
                                              id={key}
                                              items={columns[key]}
                                              style={{
                                                "grid-column-start": keys.indexOf(key) % COLUMN_COUNT,
                                                "grid-row-start": Math.floor(keys.indexOf(key) / COLUMN_COUNT)
                                              }}/>)}
            </div>
        );
    }
}

Board.propTypes = {
    columns: PropTypes.object
};

export default Board;