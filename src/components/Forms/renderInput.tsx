import * as React from 'react';
import * as FA from 'react-fontawesome';
import 'react-select/dist/react-select.css';
import { Input } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';

export const renderInput = (props: any) => {
    return (
        <div>
            <div className="inputArea">
                <label>{props.placeholder}</label>
                <Input {...props.input} {...props} />
            </div>
            {(props.meta.touched && props.meta.error) ?
                (<div className="warn">
                    <FA className="left-hand-icon" name="exclamation-circle" />
                    {props.meta.error}
                </div>) : null}
        </div>
    );
};
