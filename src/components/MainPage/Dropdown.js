import React, { Component } from "react";
import MaterialIcon from "material-icons-react";

class Dropdown extends Component {
    render() {
        return (
            <div className="Dropdown">
                <MaterialIcon icon="reorder"
                              size="50"
                              invert/>
            </div>
        )
    }
}

export default Dropdown;