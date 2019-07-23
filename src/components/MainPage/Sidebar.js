import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import SearchBody from "./SearchBody";

const initialData = {
    searchValue: ""
};

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = initialData;
    }

    onChange(e) {
        this.setState({searchValue: e.target.value});
    }

    render() {
        console.log(this.props.column);
        const search = this.state.searchValue.toLowerCase();
        return (
            <div className="Sidebar">
                <SearchBar onChange={e => this.onChange(e)}
                           value={this.state.searchValue}/>
                <SearchBody column={this.props.column.filter(block => search? block.content.toLowerCase().includes(search) : false)}/>
            </div>
        )
    }
}

Sidebar.propTypes = {
    column: PropTypes.array
}

export default Sidebar;