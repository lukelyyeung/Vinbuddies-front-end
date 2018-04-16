import * as React from 'react';
import * as moment from 'moment';
import * as FA from 'react-fontawesome';
import 'react-select/dist/react-select.css';
import { Button } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export class DatePickerInput extends React.Component<any> {
    constructor(props: any) {
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

export const renderDatePicker = (props: any) => {
    const { input: { value: date } } = props;
    const changeHandler = (newDate: moment.Moment) => props.input.onChange(newDate);
    return (
        <div className="dateTag">
        <label>{props.placeholder}</label>    
        <DatePicker
            customInput={<DatePickerInput/>}
            className="datePicker"
            onChange={changeHandler}
            showTimeSelect={true}
            dateFormat="LLL"
            timeFormat="HH:mm"
            todayButton={'Today'}
            selected={date !== '' ? date : null}
            withPortal={true}
            shouldCloseOnSelect={false}
        />
        {(props.meta.touched && props.meta.error) ?
                    (<div className="warn">
                        <FA className="left-hand-icon" name="exclamation-circle" />
                        {props.meta.error}
                    </div>) : null
                }
        </div>
    );
};