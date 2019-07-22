import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Board from "./Board";
import Sidebar from "./Sidebar";

import axios from "axios";
import API from "../../config/api";
axios.defaults.withCredentials = true;

const coursesUrl = `${API.courses}/`;
const MAX_ELEMENTS = 20;

const initialData = {
    courses: [],
    columns: {
        "fall": [],
        "winter": [],
        "spring": []
    }, 
    searchBody: []
};

class PageBody extends Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.state = initialData;
    }

    componentDidMount() {
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
                this.setState(courses);
                this.setSearchBody();
          });
    }

    setSearchBody() {
        this.setState({searchBody: this.state.courses.slice(0, MAX_ELEMENTS).map(course => {
            return {
                id: course._id,
                content: course.title
            };
        })});
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

        const searchBody = columns.searchBody;
        Reflect.deleteProperty(columns, 'searchBody');
        this.setState(columns, searchBody);
    }

    render() {
        return (
            <div className="PageBody">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Board columns={this.state.columns}/>
                    <Sidebar column={this.state.searchBody}/>
                </DragDropContext>
            </div>
        )
    }
}

export default PageBody;