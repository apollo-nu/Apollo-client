import React, { Component } from "react";
import {DragDropContext} from "react-beautiful-dnd";

import Row from "./components/Row";

const initialData = {
  column: {
    id: 'column-1',
    numberIds: ['four', 'one', 'five', 'three', 'two'],
  },
  numbers: {
    'five': { id: 'five', content: '5' },
    'four': { id: 'four', content: '4' },
    'one': { id: 'one', content: '1' },
    'three': { id: 'three', content: '3' },
    'two': { id: 'two', content: '2' },
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
    if (!destination) { return }
  
    const column = this.state.column;
    const numberIds = Array.from(column.numberIds);
    numberIds.splice(source.index, 1);
    numberIds.splice(destination.index, 0, draggableId);

    this.setState({
      column: {
        id: this.state.column.id,
        numberIds: numberIds
      }
    })
  }

  render() {
    const numbers = this.state.column.numberIds.map(numberId => this.state.numbers[numberId]);

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Row column={this.state.column}
             items={numbers}>
        </Row>
      </DragDropContext>
    )
  }
}

export default App;
