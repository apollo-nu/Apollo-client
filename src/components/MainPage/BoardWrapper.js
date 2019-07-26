import React, { Component } from "react";
import PropTypes from "prop-types";
import Board from "./Board";

class BoardWrapper extends Component {
    render() {
        return (
            <div className="BoardWrapper">
                <Board columns={this.props.columns}/>
            </div>
        )
    }
}

BoardWrapper.propTypes = {
    columns: PropTypes.object
};

export default BoardWrapper;