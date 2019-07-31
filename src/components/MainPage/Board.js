import React, { Component } from "react";
import PropTypes from "prop-types";
import Column from "./Column";

const COLUMN_COUNT = 4;

class Board extends Component {
    render() {
        const columns = this.props.columns;
        const keys = Object.keys(columns).sort((a, b) => (columns[a].column.term.id > columns[b].column.term.id ? 1:-1));
        return (
            <div className="BoardWrapper">
                <div className="Board">
                    {keys.map((key, i) => <Column key={i}
                                                  id={key}
                                                  items={columns[key].cards}
                                                  name={columns[key].column.term.name}
                                                  style={{
                                                      gridColumnStart: (keys.indexOf(key) % COLUMN_COUNT) + 1,
                                                      gridRowStart: Math.floor(keys.indexOf(key) / COLUMN_COUNT) + 1
                                                  }}/>)}
                </div>
            </div>
        );
    }
}

Board.propTypes = {
    columns: PropTypes.object
};

export default Board;