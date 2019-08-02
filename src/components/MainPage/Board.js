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
        const columns = this.props.columns;
        const keys = this.sortColumns(columns);
        return (
            <div className="Board">
                {keys.map((key, i) => (
                    <div key={i}>
                        <div className="ColumnTitle">
                            {columns[key].column.name || ""}
                        </div>
                        <Column id={key}
                                items={columns[key].cards}
                                className="Column"
                                style={{
                                    gridColumnStart: (keys.indexOf(key) % COLUMN_COUNT) + 1,
                                    gridRowStart: Math.floor(keys.indexOf(key) / COLUMN_COUNT) + 1
                                }}/>
                    </div>))}
            </div>
        );
    }
}

Board.propTypes = {
    columns: PropTypes.object
};

export default Board;