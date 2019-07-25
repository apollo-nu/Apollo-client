import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Board from "./Board";
import Sidebar from "./Sidebar";

import axios from "axios";
import API from "../../config/api";
axios.defaults.withCredentials = true;
const coursesUrl = `${API.courses}/`;
const boardsUrl = `${API.boards}/`;

const initialData = {
    columns: {
        "fall": [],
        "winter": [],
        "spring": []
    },
    searchBody: [],
    searchValue: ""
};

class PageBody extends Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.state = initialData;

        this.courses = [];
        this.courseNames = [];

        this.getBoards();
        this.getCourses();
    }
    
    getCourses() {
        axios.get(coursesUrl)
            .then(res => {
                res = res.data;
                if (!res.ok) {
                    console.log(res.message);
                    return;
                }
                const courses = res.body.courses;
                this.courses = courses;
                this.searchStrings = courses.map(course => this.displayString(course).toLowerCase());
          })
          .catch(err => {
            console.log(err);
          });
    }

    displayString(course) {
        return `${course.subject.symbol} ${course.catalog_num}: ${course.title}`;
    }

    getBoards() {
        axios.get(boardsUrl + `user/${sessionStorage.getItem("id")}`)
            .then(res => {
                res = res.data;
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    setBoards() {
        console.log("Set user board");
    }

    onSearchChange(e) {
        const searchValue = e.target.value;
        let searchBody = [];
        if (searchValue) {
            const courses = this.courses,
                  searchStrings = this.searchStrings,
                  termLowerCase = searchValue.toLowerCase();
            for (let i = 0; i < this.courses.length; i++) {
                if (searchStrings[i].includes(termLowerCase)) {
                    searchBody.push(courses[i]);
                }
            }
        }
        this.setState({searchBody, searchValue});
    }

    onDragEnd(result) {
        const { destination, source } = result;
        if (!(destination && source)) { return; }
    
        let columns = this.state.columns;
        columns.searchBody = this.state.searchBody;

        let sourceColumn = columns[source.droppableId];
        let destColumn = columns[destination.droppableId];
    
        const item = sourceColumn.splice(source.index, 1)[0];
        destColumn.splice(destination.index, 0, item);
    
        columns[source.droppableId] = sourceColumn;
        columns[destination.droppableId] = destColumn;

        this.setState({searchBody: columns.searchBody});
        Reflect.deleteProperty(columns, 'searchBody');
        this.setState(columns);
    }

    render() {
        return (
            <div className="PageBody">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Board columns={this.state.columns}/>
                    <Sidebar value={this.state.searchValue}
                             column={this.state.searchBody}
                             onChange={e => this.onSearchChange(e)}/>
                </DragDropContext>
            </div>
        )
    }
}

export default PageBody;