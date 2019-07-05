import React, { Component } from "react";
import {Draggable} from "react-beautiful-dnd";
import "../css/Card.css";

class Card extends Component {
    render() {
        return (
            <Draggable draggableId={this.props.draggableId}
                       index={this.props.index}>
                {provided => (
                    <div className={this.props.className}
                         ref={provided.innerRef}
                             {...provided.draggableProps}
                             {...provided.dragHandleProps}>
                        {this.props.items}
                    </div>
                )}
            </Draggable>
        )
    }
}

export default Card;