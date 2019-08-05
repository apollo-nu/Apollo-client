import React, { Component } from "react";

class Toolbar extends Component {
    render() {
        return (
            <div className="Toolbar">
                <input className="EditRowsButton"
                       type="button"
                       value="Modify Planning Years"/>
            </div>
        )
    }
}

export default Toolbar;