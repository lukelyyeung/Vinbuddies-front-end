import * as React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Link } from 'react-router-dom';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import * as FA from 'react-fontawesome';

interface Credentials {
    email: string;
    password: string;
}

interface CredentialsError {
    email?: string;
    password?: string;
}

const validate = (values: Credentials) => {
    let errors: CredentialsError = {};
    if (!values.password) {
        errors.password = 'Required';
    }
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    return errors;
};

const renderField = (props: any) => {
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

const PureLoginForm = (props: InjectedFormProps) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Field name="email" type="email" component={renderField} placeholder="Email" />
            <Field name="password" type="password" component={renderField} placeholder="Password" />
            <div className="flexBox-row">
                <Button color="success" type="submit" disabled={submitting}>Login</Button>
                <Button color="secondary" type="button" disabled={pristine || submitting} onClick={reset}>Clear</Button>
                <Link to="/signup"><Button color="info">Sign up</Button></Link>
            </div>
        </form>
    );
};

// Decorate the form component
export let LoginForm = reduxForm({
    form: 'login',
    validate: validate
})(PureLoginForm);