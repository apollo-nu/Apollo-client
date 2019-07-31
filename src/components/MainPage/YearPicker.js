import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const YEAR_RANGE = 6;

class YearPicker extends Component {
    constructor(props) {
        super(props);

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        
        let yearRange = [];
        for (let year = currentYear - YEAR_RANGE + 1; year < currentYear + YEAR_RANGE; year++) {
            yearRange.push({
                value: year,
                label: `${year}-${(year + 1).toString().slice(2, 4)}`
            });
        }
        this.years = yearRange;

        const DEFAULT_YEAR = yearRange[Math.floor(yearRange.length / 2)];
        this.state = {
            startYear: DEFAULT_YEAR,
            endYear: DEFAULT_YEAR
        };
    }

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