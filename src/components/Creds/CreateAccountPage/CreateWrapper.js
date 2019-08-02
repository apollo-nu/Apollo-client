import React, { Component } from "react";
import PropTypes from "prop-types";
import CreateForm from "./CreateForm";

// UI wrapper for the input form
class CreateWrapper extends Component {
    render() {
        return (
            <div className="AuthWrapper">
                <div className="AuthHeaderText">
                    Create an Account
                </div>
                <CreateForm history={this.props.history}/>
            </div>
        );
    }
}

CreateWrapper.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

export default CreateWrapper;
