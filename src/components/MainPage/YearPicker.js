import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

class YearPicker extends Component {
    constructor(props) {
        super(props);
        this.setUpDropDowns();
    }

    // Generates years to display in drop-down menus
    setUpDropDowns() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        
        const YEAR_RANGE = 6;
        let years = [];
        for (let year = currentYear - YEAR_RANGE + 1; year < currentYear + YEAR_RANGE; year++) {
            years.push({
                value: year,
                label: `${year}-${(year + 1).toString().slice(2, 4)}`
            });
        }
        this.years = years;

        const DEFAULT_YEAR = years[Math.floor(years.length / 2)];
        this.state = {
            startYear: DEFAULT_YEAR,
            endYear: DEFAULT_YEAR
        };
    }

    // Callback for clicking submit, checks if inputs are valid
    handleSubmit() {
        if (this.state.startYear.value > this.state.endYear.value) {
            return;
        }
        this.props.onSubmit(this.state.startYear, this.state.endYear);
    }

    render() {
        return (
            <div className="YearPicker">
                Select Academic Years to Plan:
                <div className="YearDropdownWrapper">
                    <Dropdown options={this.years}
                              value={this.state.startYear}
                              onChange={year => this.setState({startYear: year})}/>
                    -
                    <Dropdown options={this.years}
                              value={this.state.endYear}
                              onChange={year => this.setState({endYear: year})}/>
                </div>
                <input type="button"
                       onClick={this.handleSubmit.bind(this)}
                       value="Create Board"/>
            </div>
        )
    }
}

YearPicker.propTypes = {
    onSubmit: PropTypes.func
}

export default YearPicker;