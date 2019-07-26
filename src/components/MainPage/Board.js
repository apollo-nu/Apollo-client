import React, { Component } from "react";
import PropTypes from "prop-types";
import Column from "./Column";

class Board extends Component {
    render() {
        const columns = this.props.columns;
        return (
            <div className="Board">
                {Object.keys(columns).map((key, i) => <Column key={i}
                                                           id={key}
                                                           items={columns[key]}/>)}
            </div>
        );
    }
}

Board.propTypes = {
    columns: PropTypes.object
};

export default Board;