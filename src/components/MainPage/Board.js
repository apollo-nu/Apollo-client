import React, { Component } from "react";
import PropTypes from "prop-types";
import Column from "./Column";

// Represents the numeric order of seasons as they occur in a calendar year
const seasonMap = {
    "Winter": 1,
    "Spring": 2, 
    "Summer": 3,
    "Fall": 4
}
const COLUMN_COUNT = 4;

class Board extends Component {
    // Sorts columns in correct date order based on name
    sortColumns(columns) {
        return Object.keys(columns).sort((a, b) => {
            const aName = columns[a].column.name,
                  bName = columns[b].column.name;
            if (aName.slice(0, 4) === bName.slice(0, 4)) {
                return seasonMap[aName.slice(5)] > seasonMap[bName.slice(5)]? 1:-1;
            }
            return aName > bName? 1:-1;
        });
    }

    render() {
        const keys = this.sortColumns(this.props.columns);
        return (
            <div className="BoardWrapper">
                <div className="Board">
                    {keys.map((key, i) => <Column key={i}
                                                  id={key}
                                                  items={columns[key].cards}
                                                  name={columns[key].column.name}
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