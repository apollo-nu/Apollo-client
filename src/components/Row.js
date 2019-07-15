import React, { Component } from "react";
import {Droppable} from "react-beautiful-dnd";
import "../css/Row.css";
import Card from "./Card";

class Row extends Component {
    render() {
        return (
            <div className="Row">
                <Droppable droppableId={this.props.column.id}>
                    {provided => (
                        <div ref={provided.innerRef}
                            {...provided.droppableProps}
                            {...provided.droppablePlaceholder}>
                            {this.props.items.map(block => <Card key={block.id}
                                                                 draggableId={block.id}
                                                                 index={this.props.column.numbers.map(obj => obj.id).indexOf(block.id)}
                                                                 items={block.content}>
                                                           </Card>)}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        )
    }
}

export default Row;