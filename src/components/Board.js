import React, { Component } from "react";
import {DragDropContext} from "react-beautiful-dnd";
import "../css/Board.css";
import Row from "./Row";
import axios from "axios";

const serverUrl = "http://localhost:8081/courses/";

class Board extends Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.state = {columns: {}};
    }

    componentDidMount() {
        axios.get(serverUrl)
          .then(res => {
            res = res.data;
            if (!res.ok) { return; }
    
            const columns = this.state.columns;
            columns["courses"] = res.body.courses.map(course => {
              return {
                id: course._id,
                content: course.title
              }
            })
            this.setState(columns);
          })
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
                    {Object.keys(columns).map((key, i) => <Row key={i}
                                                               column={{id: key, numbers: columns[key]}}
                                                               items={columns[key]}>
                                                          </Row>)}
                </DragDropContext>
            </div>
        )
    }
}

export default Board;