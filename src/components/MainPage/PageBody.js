import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import Board from "./Board";
import Sidebar from "./Sidebar";
import YearPicker from "./YearPicker";

import axios from "axios";
import API from "../../config/api";
axios.defaults.withCredentials = true;

const coursesUrl = `${API.courses}/`;
const boardsUrl = `${API.boards}/`;
const columnsUrl = `${API.columns}/`;
const cardsUrl = `${API.cards}/`;

const initialData = {
    board: {
        board: {},
        columns: {}
    },
    searchBody: [],
    searchValue: "",
    yearPickerVisible: false
};
const seasons = ["Fall", "Winter", "Spring", "Summer"];

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

    // Gets board and decides whether returning or new user flow is used.
    initBoard() {
        axios.get(boardsUrl + `user/${this.state.userId}`)
            .then(res => {
                res = res.data;
                if (res.ok) {
                    let board = res.body.board;
                    if (board) {
                        this.getColumns(board);
                    } else {
                        this.setState({yearPickerVisible: true});
                    }
                } else {
                    console.log(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    /* 
        Returning User Flow
                             */

    // Finds existing columns for the user's board
    getColumns(board) {
        const boardId = board._id;
        axios.get(columnsUrl + `board/${boardId}`)
            .then(res => {
                res = res.data;
                if (res.ok) {
                    const columns = res.body.columns;
                    this.getCards(columns, board);
                } else {
                    console.log(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    // Finds existing cards for each column and sets the board state
    getCards(columns, board) {
        let newBoard = {
            board: board,
            columns: {}
        };
        for (let column of columns) {
            axios.get(cardsUrl + `column/${column._id}`)
                .then(cardRes => {
                    cardRes = cardRes.data;
                    if (cardRes.ok) {
                        newBoard.columns[column._id] = {
                            column: column,
                            cards: cardRes.body.cards
                        };
                        if (Object.keys(newBoard.columns).length === columns.length) {
                            this.setState({board: newBoard});
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

    /* 
        New User Flow
                        */

    // Callback that fires on year picker submit
    onYearPickerSubmit(startYear, endYear) {
        this.postBoard(startYear.value, endYear.value);
        this.setState({yearPickerVisible: false});
    }

    // Creates a new board for the user
    postBoard(startYear, endYear) {
        axios.post(boardsUrl + `user/${this.state.userId}`)
            .then(res => {
                res = res.data;
                if (res.ok) {
                    const columnNames = this.getColumnNames(startYear, endYear);
                    this.addColumns({
                        board: res.body.board,
                        columns: {}
                    }, columnNames);
                } else {
                    console.log(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    // Helper function to make column names out of year and season
    columnName(year, seasonIndex) {
        return `${year} ${seasons[seasonIndex]}`;
    }

    // Generates array of column names to create and POST
    getColumnNames(startYear, endYear) {
        let names = [this.columnName(startYear, 0)];
        const endName = this.columnName(endYear + 1, 3);
        while (names[names.length - 1] !== endName) {
            const prevName = names[names.length - 1];
            const prevSeason = prevName.slice(5);
            const nextSeasonIndex = (seasons.indexOf(prevSeason) + 1) % seasons.length;
            const year = parseInt(prevName.slice(0, 4), 10) + (nextSeasonIndex === 1 ? 1 : 0);
            names.push(this.columnName(year, nextSeasonIndex));
        }
        return names;
    }

    // POSTs columns and sets board state
    addColumns(board, termNames) {
        let columnsAdded = 0;
        const callback = columnRes => {
            columnRes = columnRes.data;
            if (columnRes.ok) {
                const column = columnRes.body.column;
                board.columns[column._id] = {
                    column: column,
                    cards: []
                };
                if (++columnsAdded === termNames.length) {
                    this.setState({board: board});
                }
            } else {
                console.log(columnRes.message);
            }
        }
        for (let term of termNames) {
            axios.post(columnsUrl + `board/${board.board._id}`, {name: term})
                .then(columnRes => callback(columnRes))
                .catch(err => {
                    console.log(err);
                });
        }
    }

    /* 
        Course-handling and Search methods
                                            */

    // Returns list of all courses
    getCourses() {
        axios.get(coursesUrl)
            .then(res => {
                res = res.data;
                if (res.ok) {
                    const courses = res.body.courses;
                    this.courses = courses;
                    this.searchStrings = courses.map(course => this.displayString(course).toLowerCase());
                    this.populateSearchBody(this.state.searchValue);
                } else {
                    console.log(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    // Helper function to generate search strings of cards
    displayString(course) {
        return `${course.subject.symbol} ${course.catalog_num}: ${course.title}`;
    }

    // Filtering function, returns courses that match text field
    onSearchChange(e) {
        this.populateSearchBody(e.target.value);
    }

    populateSearchBody(searchValue) {
        let courseResults = [],
            nameResults = [];
        if (searchValue) {
            const courses = this.courses,
                  searchStrings = this.searchStrings,
                  termLowerCase = searchValue.toLowerCase();
            let courseSet = new Set();
            for (let i = 0; i < this.courses.length; i++) {
                if (!courseSet.has(courses[i].title)) {
                    courseSet.add(courses[i].title);
                    const searchString = searchStrings[i];
                    if (searchString.includes(termLowerCase)) {
                        const course = {
                            _id: courses[i]._id,
                            course: courses[i]
                        };
                        if (searchString.indexOf(termLowerCase) === 0) {
                            courseResults.push(course);
                        } else {
                            nameResults.push(course);
                        }
                    }
                }
            }
        }
        this.setState({
            searchBody: courseResults.sort().concat(nameResults.sort()),
            searchValue: searchValue
        });
    }

    /* 
        Card Manipulation Methods
                                    */

    // Required method for DragDropContext, handles moving cards between columns
    onDragEnd(result) {
        const { destination, source } = result;
        if (!(destination && source)) { return; }

        let columns = this.state.board.columns;
        columns.searchBody = {
            cards: this.state.searchBody
        }

        const sourceId = source.droppableId;
        const destId = destination.droppableId;

        let sourceColumnCards = columns[sourceId].cards;
        let destColumnCards = columns[destId].cards;

        const card = sourceColumnCards.splice(source.index, 1)[0];
        destColumnCards.splice(destination.index, 0, card);
    
        columns[sourceId].cards = sourceColumnCards;
        columns[destId].cards = destColumnCards;

        if (this.isSearchBody(destId) && columns.searchBody.cards.length <= 1) {
            this.setState({searchBody: []});
        } else {
            this.setState({searchBody: columns.searchBody.cards});
        }
        Reflect.deleteProperty(columns, "searchBody");

        let board = this.state.board;
        board.columns = columns;
        this.setState({board: board});

        this.handleCardMove(card, sourceId, destId);
    }

    // Fires API requests when cards are moved to store state in database
    handleCardMove(card, sourceId, destId) {
        if (!this.isSearchBody(sourceId) && this.isSearchBody(destId)) {
            axios.delete(cardsUrl + card._id)
                .catch(err => {
                    console.log(err);
                });
        } else if (!this.isSearchBody(sourceId) && !this.isSearchBody(destId)) {
            axios.patch(cardsUrl + `column/${destId}`, {
                cardId: card._id
            })
                .catch(err => {
                    console.log(err);
                });
        } else if (this.isSearchBody(sourceId) && !this.isSearchBody(destId)) {
            axios.post(cardsUrl + `column/${destId}`, {
                course: card.course._id
            })
                .then(res => {
                    res = res.data;
                    if (res.ok) {
                        let board = this.state.board;
                        const cards = board.columns[destId].cards;
                        for (let i in cards) {
                            if (cards[i]._id === res.body.card.course) {
                                cards[i]._id = res.body.card._id;
                                board.columns[destId].cards = cards;
                                break;
                            }
                        }
                        this.setState({board: board});
                    } else {
                        console.log(res.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    // Helper function to differentiate the searchBody column
    isSearchBody(id) {
        return id === "searchBody";
    }

    render() {
        return (
            <div className="PageBody">
                {this.state.yearPickerVisible? 
                    <YearPicker onSubmit={this.onYearPickerSubmit.bind(this)}/> : 
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Board columns={this.state.board.columns}/>
                        <Sidebar value={this.state.searchValue}
                                 column={this.state.searchBody}
                                 onChange={e => this.onSearchChange(e)}/>
                    </DragDropContext>}
            </div>
        )
    }
}

PageBody.propTypes = {
    id: PropTypes.string
}

export default PageBody;