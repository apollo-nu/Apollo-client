import React, { Component } from "react";
import Board from "./components/Board";
import "./css/App.css";

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
  render() {
    return (
      <Board columns={{columns: initialData.columns}}>
      </Board>
    )
  }
}

export default App;
