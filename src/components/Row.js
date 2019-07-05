import React, { Component } from "react";
import {Droppable} from "react-beautiful-dnd";
import "../css/Row.css";
import Card from "./Card";

class Row extends Component {
    render() {
        return (
            <Droppable droppableId={this.props.column.id} className="Row">
                {provided => (
                    <div className={this.props.className}
                         ref={provided.innerRef}
                         {...provided.droppableProps}
                         {...provided.droppablePlaceholder}>
                        {this.props.items.map(block => <Card draggableId={block.id} 
                                                             index={this.props.column.numberIds.indexOf(block.id)}
                                                             key={parseInt(block.content, 10)} //need to change this later
                                                             items={block.content}>
                                                       </Card>)}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }
}

export default Row;