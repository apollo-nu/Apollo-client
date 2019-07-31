import React, { Component } from "react";
import PropTypes from "prop-types";
import Column from "./Column";

const COLUMN_COUNT = 4;

class Board extends Component {
    render() {
        const columns = this.props.columns;
        const keys = Object.keys(columns).sort((a, b) => columns[a].column.term.name > columns[b].column.term.name ? 1:-1);
        return (
            <div className="BoardWrapper">
                Board Title
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