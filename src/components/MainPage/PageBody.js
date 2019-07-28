import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import Board from "./Board";
import Sidebar from "./Sidebar";

import axios from "axios";
import API from "../../config/api";
axios.defaults.withCredentials = true;

const coursesUrl = `${API.courses}/`;
const boardsUrl = `${API.boards}/`;
const columnsUrl = `${API.columns}/`;
const cardsUrl = `${API.cards}/`;

const initialData = {
    board: {},
    boardIndex: 0,
    searchBody: [],
    searchValue: ""
};

class PageBody extends Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.state = initialData;
        this.state.userId = this.props.id;

        this.courses = [];
        this.courseNames = [];
    }

    componentWillMount() {
        this.initBoard();
        this.getCourses();
    }

    // Course-handling and Search methods
    
    getCourses() {
        axios.get(coursesUrl)
            .then(res => {
                res = res.data;
                if (res.ok) {
                    const courses = res.body.courses;
                    this.courses = courses.map(course => ({
                        _id: course._id,
                        course: course
                    }));
                    this.searchStrings = courses.map(course => this.displayString(course).toLowerCase());
                } else {
                    console.log(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
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

    displayString(course) {
        return `${course.subject.symbol} ${course.catalog_num}: ${course.title}`;
    }

    // Board-handling methods

    initBoard() {
        axios.get(boardsUrl + `user/${this.state.userId}`)
            .then(res => {
                res = res.data;
                if (res.ok) {
                    let board = res.body.board;
                    if (board) {
                        this.getBoard(board._id);
                    } else {
                        this.postBoard();
                    }
                } else {
                    console.log(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    getBoard(boardId) {
        axios.get(columnsUrl + `board/${boardId}`)
            .then(res => {
                res = res.data;
                if (res.ok) {
                    const columns = res.body.columns;
                    this.getColumns(columns);
                } else {
                    console.log(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    getColumns(columns) {
        let board = {};
        for (let column of columns) {
            axios.get(cardsUrl + `column/${column._id}`)
                .then(cardRes => {
                    cardRes = cardRes.data;
                    if (cardRes.ok) {
                        board[column._id] = cardRes.body.cards;
                        if (Object.keys(board).length === columns.length) {
                            this.setState({board: board});
                        }
                    } else {
                        console.log(cardRes.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    postBoard() {
        axios.post(boardsUrl + `user/${this.state.userId}`)
            .then(res => {
                res = res.data;
                if (res.ok) {
                    const boardId = res.body._id
                    const initialRows = [
                        "fall", 
                        "winter", 
                        "spring", 
                        "summer"
                    ];
                    this.addRowOfColumns(boardId, initialRows);
                } else {
                    console.log(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    addRowOfColumns(boardId, columns) {
        let board = this.state.board,
            columnsAdded = 0;
        const callback = (columnRes) => {
            columnRes = columnRes.data;
            if (columnRes.ok) {
                board[columnRes.body._id] = [];
                if (++columnsAdded === columns.length) {
                    this.setState({board: board});
                }
            } else {
                console.log(columnRes.message);
            }
        }
        for (let title of columns) {
            axios.post(columnsUrl + `board/${boardId}`, {term: title})
                .then(columnRes => callback(columnRes))
                .catch(err => {
                    console.log(err);
                });
        }
    }

    // Card Manipulation Methods

    onDragEnd(result) {
        const { destination, source } = result;
        if (!(destination && source)) { return; }

        let columns = this.state.board;
        columns.searchBody = this.state.searchBody;

        let sourceColumn = columns[source.droppableId];
        let destColumn = columns[destination.droppableId];

        const item = sourceColumn.splice(source.index, 1)[0];
        destColumn.splice(destination.index, 0, item);
    
        const sourceId = source.droppableId;
        const destId = destination.droppableId;
        columns[sourceId] = sourceColumn;
        columns[destId] = destColumn;

        if (columns.searchBody.length === 1 && this.isSearchBody(destId)) {
            this.setState({searchBody: []});
        } else {
            this.setState({searchBody: columns.searchBody});
        }

        Reflect.deleteProperty(columns, "searchBody");
        this.setState({board: columns});

        this.handleCardMove(item, sourceId, destId);
    }

    isSearchBody(id) {
        return id === "searchBody";
    }

    handleCardMove(item, sourceId, destId) {
        if (!this.isSearchBody(sourceId) && this.isSearchBody(destId)) {
            axios.delete(cardsUrl + item._id)
                .catch(err => {
                    console.log(err);
                });
        } else if (!this.isSearchBody(sourceId) && !this.isSearchBody(destId)) {
            axios.patch(cardsUrl + `column/${destId}`, {
                cardId: item._id
            })
                .catch(err => {
                    console.log(err);
                });
        } else if (this.isSearchBody(sourceId) && !this.isSearchBody(destId)) {
            axios.post(cardsUrl + `column/${destId}`, {
                course: item._id
            })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div className="PageBody">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Board columns={this.state.board}/>
                    <Sidebar value={this.state.searchValue}
                             column={this.state.searchBody}
                             onChange={e => this.onSearchChange(e)}/>
                </DragDropContext>
            </div>
        )
    }
}

PageBody.propTypes = {
    id: PropTypes.string
}

export default PageBody;