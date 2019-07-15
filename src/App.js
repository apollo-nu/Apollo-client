import React, { Component } from "react";
import {DragDropContext} from "react-beautiful-dnd";
import "./css/App.css";
import Row from "./components/Row";

const initialData = {
  columns: {
    'column-1': [
      { id: 'five', content: '5' },
      { id: 'four', content: '4' },
      { id: 'one', content: '1' },
      { id: 'three', content: '3' },
      { id: 'two', content: '2' }
    ],
    'column-2': [
      { id: 'six', content: '6' },
      { id: 'seven', content: '7' },
      { id: 'eight', content: '8' },
      { id: 'nine', content: '9' },
      { id: 'ten', content: '10' }
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
    const column1 = {
      id: 'column-1',
      numbers: this.state.columns['column-1']
    }
    const column2 = {
      id: 'column-2',
      numbers: this.state.columns['column-2']
    }

    return (
      <DragDropContext className="Board"
                       onDragEnd={this.onDragEnd}>
        <Row column={column1}
             items={column1.numbers}>
        </Row>
        <Row column={column2}
             items={column2.numbers}>
        </Row>
      </DragDropContext>
    )
  }
}

export default App;
