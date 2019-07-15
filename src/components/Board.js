import React, { Component } from "react";
import {DragDropContext} from "react-beautiful-dnd";
import "../css/Board.css";
import Row from "./Row";
import Grid from "react-css-grid";

const GRID_WIDTH = 320;
const GRID_SPACING = 80;

class Board extends Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.state = {...props.columns};
    }

    onDragEnd(result) {
        const { destination, source } = result;
        if (!(destination && source)) { return }
    
        const columns = this.state.columns;
        let sourceColumn = columns[source.droppableId];
        let destColumn = columns[destination.droppableId];
    
        const item = sourceColumn.splice(source.index, 1)[0];
        destColumn.splice(destination.index, 0, item);
    
        columns[source.droppableId] = sourceColumn;
        columns[destination.droppableId] = destColumn;
        this.setState(columns);
    }

    render() {
        const columns = this.state.columns;
        return (
            <div className="Board">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Grid width={GRID_WIDTH}
                        gap={GRID_SPACING}
                        align={"center"}>
                        {Object.keys(columns).map((key, i) => <Row key={i}
                                                                   column={{id: key, numbers: columns[key]}}
                                                                   items={columns[key]}>
                                                              </Row>)}
                    </Grid>
                </DragDropContext>
            </div>
        )
    }
}

export default Board;