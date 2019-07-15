import React, { Component } from "react";
import {DragDropContext} from "react-beautiful-dnd";

import Row from "./components/Row";

const initialData = {
  columns: {
    'column-1': [
      { id: 'five', content: '5' },
      { id: 'four', content: '4' },
      { id: 'one', content: '1' },
      { id: 'three', content: '3' },
      { id: 'two', content: '2' }
    ]
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.state = {...initialData};
  }

  onDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!(destination && source)) { return }
    console.log(destination, source);

    const columns = this.state.columns;
    let sourceColumn = columns[source.droppableId];
    let destColumn = columns[source.droppableId];

    const item = sourceColumn.splice(source.index, 1);
    console.log(item);
    destColumn.splice(destination.index, 0, item);
    columns[source.droppableId] = sourceColumn;
    columns[destination.droppableId] = destColumn;

    this.setState({
      columns: columns
    })
  
    /*
    const column = this.state.column;
    const numberIds = Array.from(column.numberIds);
    numberIds.splice(source.index, 1);
    numberIds.splice(destination.index, 0, draggableId);

    this.setState({
      column: {
        id: this.state.column.id,
        numberIds: Object.keys(this.state.numbers)
      }
    })
    */
  }

  render() {
    const column = {
      id: 'column-1',
      numbers: this.state.columns['column-1']
    }
    console.log(column);

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Row column={column}
             items={column.numbers}>
        </Row>
      </DragDropContext>
    )
  }
}

export default App;
