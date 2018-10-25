import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import * as FA from 'react-fontawesome';

const validate = (values) => {
    let errors = {};

    if (!values.password) {
        errors.password = 'Required';
    } else if (!/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(values.password)) {
        errors.password = 'Password should contain both number and alphabets';
    } else if (values.password.length < 8) {
        errors.password = 'Password should be at least 8 characters';
    }
    if (!values.confirmedPassword) {
        errors.confirmedPassword = 'Required';
    } else if (values.confirmedPassword !== values.password) {
        errors.confirmedPassword = 'Password does not match the confirm password';
    }
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.username) {
        errors.username = 'Required';
    } else if (/\s+/g.test(values.username)) {
        errors.username = 'Username should not contain whitespace';
    } else if (!/^[_A-z0-9]*((-)*[_A-z0-9])*$/.test(values.username)) {
        errors.username = 'Username should not contain special character except "-" ';
    }
    return errors;
};

const renderField = (props) => {
    return (
        <div>
            <InputGroup className="inputArea">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>{props.placeholder}</InputGroupText>
                </InputGroupAddon>
                <Input type={props.type} {...props.input} />
            </InputGroup>
            {(props.meta.touched && props.meta.error) ?
                (<div className="warn">
                    <FA className="left-hand-icon" name="exclamation-circle" />
                    {props.meta.error}
                </div>) : null}
        </div>
    );
};

const PureSignupForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form>
            <Field name="username" type="text" component={renderField} placeholder="User Name" />
            <Field name="email" type="email" component={renderField} placeholder="Email" />
            <Field name="password" type="password" component={renderField} placeholder="Password" />
            <Field name="confirmedPassword" type="password" component={renderField} placeholder="Confirm Password" />
            <div className="flexBox-row">
                <Button
                    color="info"
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                >
                    Sign Up
                </Button>
                <Button color="secondary" type="button" disabled={pristine || submitting} onClick={reset}>Clear</Button>
            </div>
        </form>
    );
};

// Decorate the form component
export let SignupForm = reduxForm({
    form: 'signup',
    validate: validate
})(PureSignupForm);
