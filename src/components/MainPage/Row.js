import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import Card from "./Card";

const MAX_CARDS = 100;

class Row extends Component {
    displayString(course) {
        return `${course.subject.symbol} ${course.catalog_num}: ${course.title}`;
    }

    render() {
        return (
            <Droppable droppableId={this.props.id}>
                {provided => (
                    <div className="Row"
                         ref={provided.innerRef}
                         {...provided.droppableProps}
                         {...provided.droppablePlaceholder}>
                         {this.props.items.slice(0, MAX_CARDS).map(block => <Card key={block._id}
                                                                                  draggableId={block._id}
                                                                                  index={this.props.items.map(obj => obj.id).indexOf(block.id)}
                                                                                  title={this.displayString(block)}/>)}
                         {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
}

Row.propTypes = {
    id: PropTypes.string,
    items: PropTypes.array
};

export default Row;