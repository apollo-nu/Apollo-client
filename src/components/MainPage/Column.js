import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import Card from "./Card";

const MAX_CARDS = 100;

class Column extends Component {
    displayString(course) {
        return `${course.subject.symbol} ${course.catalog_num}: ${course.title}`;
    }

    render() {
        return (
            <div className="ColumnWrapper">
                Column Title
                <Droppable droppableId={this.props.id}>
                    {provided => (
                        <div className="Column"
                            style={this.props.style}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            {...provided.droppablePlaceholder}>
                            {this.props.items.slice(0, MAX_CARDS).map(block => <Card key={block._id}
                                                                                    draggableId={block._id}
                                                                                    index={this.props.items.indexOf(block)}
                                                                                    title={this.displayString(block.course)}/>)}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}

Column.propTypes = {
    id: PropTypes.string,
    items: PropTypes.array,
    style: PropTypes.object
};

export default Column;