import React, { Component } from "react";
import "../../css/Submit.css";

// Email text form, may not need this as a separate component
class Submit extends Component {
    render() {
        return (
            <input type="button" 
                   value={this.props.value}
                   onClick={this.props.onClick}/>
        )
    }
}

export default Submit;