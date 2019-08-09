import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropdown from "react-dropdown";

class YearPicker extends Component {
    constructor(props) {
        super(props);
        if (Object.keys(this.props.columns).length === 0) {
            this.state = this.setUpDropDowns();
        } else {
            this.state = this.modifyDropdowns();
        }
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
        return {
            startYear: DEFAULT_YEAR,
            endYear: DEFAULT_YEAR
        };
    }

    modifyDropdowns() {
        const columns = this.props.columns;
        const columnKeys = Object.keys(columns);
        const year = yearString => yearString.slice(0, 4);
        let yearSet = new Set();

        for (let key of columnKeys) {
            const column = columns[key].column;
            yearSet.add(year(column.name));
        }
        const yearArr = [...yearSet].sort().slice(0, -1);

        this.years = yearArr.map(e => ({
            value: e,
            label: `${e}-${(parseInt(e, 10) + 1).toString().slice(2, 4)}`
        }));

        return {
            startYear: yearArr[0],
            endYear: yearArr[yearArr.length - 1]
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
                <div className="YearPickerHeader">
                    Select Academic Years to Plan:
                </div>
                <div className="YearDropdownWrapper">
                    <Dropdown options={this.years}
                              value={this.state.startYear}
                              onChange={year => this.setState({startYear: year})}/>
                    <b>-</b>
                    <Dropdown options={this.years}
                              value={this.state.endYear}
                              onChange={year => this.setState({endYear: year})}/>
                </div>
                <input type="button"
                       className="YearSubmitButton"
                       onClick={this.handleSubmit.bind(this)}
                       value={`${this.props.boardEmpty? "Create" : "Edit"} Board`}/>
            </div>
        )
    }
}

YearPicker.propTypes = {
    boardEmpty: PropTypes.bool,
    columns: PropTypes.object,
    onSubmit: PropTypes.func
}

export default YearPicker;