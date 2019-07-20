import React, { Component } from "react";
import "../../css/Password.css";

// Password text form, may not need this as a separate component
class Password extends Component {
    render() {
        return (
            <input type="password" 
                   name={this.props.name}
                   onChange={this.props.onChange}
                   value={this.props.value}/>
        )
    }
}

export default Password;