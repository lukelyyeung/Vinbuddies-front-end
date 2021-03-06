import React from 'react';
import * as FA from 'react-fontawesome';
import { Input } from 'reactstrap';

export const renderTextArea = (props) => {
    return (
        <div>
            <div className="inputArea">
                <label>{props.placeholder}</label>
                <Input {...props} {...props.input} style={{ height: '30vh' }} />
            </div>
            {(props.meta.touched && props.meta.error) ?
                (<div className="warn">
                    <FA className="left-hand-icon" name="exclamation-circle" />
                    {props.meta.error}
                </div>) : null}
        </div>
    );
};
