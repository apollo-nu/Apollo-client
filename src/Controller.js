import { Component } from "react";
import PropTypes from "prop-types";

class Controller extends Component {
    constructor(props) {
        super(props);
        // Create Account route: this.props.history.push("/createAccount/");
        // Main route: this.props.history.push("/main/");
        this.props.history.push("/login/");
    }

    render() {
        return null;
    }
}

Controller.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

export default Controller;