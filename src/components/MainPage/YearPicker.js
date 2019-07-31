import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const YEAR_RANGE = 6;

class YearPicker extends Component {
    componentWillMount() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        
        let yearRange = [];
        for (let i = currentYear - YEAR_RANGE + 1; i < currentYear + YEAR_RANGE; i++) {
            yearRange.push(i);
        }
        this.yearOptions = yearRange.map(year => `${year}-${(year + 1).toString().slice(2, 4)}`);
    }

    render() {
        const years = this.yearOptions;
        const DEFAULT_INDEX = Math.floor(years.length / 2);
        return (
            <div className="YearPicker">
                Select Academic Years to Plan:
                <div className="YearDropdownWrapper">
                    <Dropdown options={years}
                              value={years[DEFAULT_INDEX]}/>
                    -
                    <Dropdown options={years}
                              value={years[DEFAULT_INDEX]}/>
                </div>
                <input type="button"
                       onClick={this.props.onSubmit}
                       value="Create Board"/>
            </div>
        )
    }
}

YearPicker.propTypes = {
    onSubmit: PropTypes.func
}

export default YearPicker;