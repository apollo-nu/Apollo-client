import React, { Component } from "react";
import Draggable from "react-draggable";
import "../css/Card.css";

class Card extends Component {
    render() {
        return (
            <Draggable className="Draggable">
                <div className="text">
                    Hello, World!
                </div>
            </Draggable>
        )
    }
}

export default Card;