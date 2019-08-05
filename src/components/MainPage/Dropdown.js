import React, { Component } from "react";
import MaterialIcon from "material-icons-react";

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTitles: [
                "Edit Years",
                "Log Out"
            ]
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="Dropdown"
                     onClick={this.props.toggle}>
                    <MaterialIcon icon="reorder"
                                  size="50"
                                  invert/>
                </div>
                {this.props.visible?
                    <div className="DropdownList">
                        {this.state.listTitles.map(title => (
                            <div className="DropdownListItem">{title}</div>
                        ))}
                    </div>
                :null}
            </React.Fragment>
        )
    }
}

export default Dropdown;