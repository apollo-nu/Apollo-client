import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import "../css/Card.css";

class Card extends Component {
    render() {
        return (
            <Draggable draggableId={this.props.draggableId}
                       index={this.props.index}>
                {provided => (
                    <div className="Card"
                         ref={provided.innerRef}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}>
                        {this.props.items}
                    </div>
                )}
            </Draggable>
        );
    }
}

Card.propTypes = {
    draggableId: PropTypes.string,
    index: PropTypes.number,
    items: PropTypes.array
};

export default Card;