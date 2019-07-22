import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";

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
                        {this.props.title}
                    </div>
                )}
            </Draggable>
        );
    }
}

Card.propTypes = {
    draggableId: PropTypes.string,
    index: PropTypes.number,
    title: PropTypes.string
};

export default Card;