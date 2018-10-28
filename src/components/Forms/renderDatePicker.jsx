import React, { Component } from "react";
import * as FA from "react-fontawesome";
import { Button } from "reactstrap";
import DatePicker from "react-datepicker";

export class DatePickerInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button
        color="info"
        className={this.props.className}
        onClick={this.props.onClick}
      >
        {this.props.value}
      </Button>
    );
  }
}

export const renderDatePicker = props => {
  const {
    input: { value: date }
  } = props;
  const changeHandler = (newDate) =>
    props.input.onChange(newDate);
  return (
    <div className="dateTag">
      <label>{props.placeholder}</label>
      <DatePicker
        customInput={<DatePickerInput />}
        className="datePicker"
        onChange={changeHandler}
        showTimeSelect={true}
        dateFormat="LLL"
        timeFormat="HH:mm"
        todayButton={"Today"}
        selected={date !== "" ? date : null}
        withPortal={true}
        shouldCloseOnSelect={false}
      />
      {props.meta.touched && props.meta.error ? (
        <div className="warn">
          <FA className="left-hand-icon" name="exclamation-circle" />
          {props.meta.error}
        </div>
      ) : null}
    </div>
  );
};
