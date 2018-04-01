import * as React from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { LoginActions, signUpUser } from '../actions/auth-action';
import { Redirect } from 'react-router';
import { RootState } from '../store';

interface SignUpProps {
    isSignedUp: boolean;
    signUp: (
        userName: string,
        email: string,
        password: string
    ) => Promise<void>;
}

interface SignUpState {
    userName: string;
    email: string;
    password: string;
    confirmedPassword: string;
    redirectToHome: boolean;
}

type fieldProperties = 'eamil' | 'password' | 'userName' | 'confirmedPassword';

class PureSignUp extends React.Component<SignUpProps, SignUpState> {
    constructor(props: SignUpProps) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            password: '',
            confirmedPassword: '',
            redirectToHome: false
        };
    }

    onChangeField = (field: fieldProperties, e: React.FormEvent<HTMLInputElement>) => {
        const state = {};
        state[field] = e.currentTarget.value;
        this.setState(state);
    }

    signUp = async () => {
        await this.props.signUp(this.state.userName, this.state.email, this.state.password);
        if (this.props.isSignedUp) {
            this.setState({ redirectToHome: true });
        }
    }

    render() {

        if (this.state.redirectToHome) {
            return <Redirect to="/login" />;
        }
        return (
            <div className="modalBox">
                <Container>
                    <Form>
                        <FormGroup>
                            <Label>User Name</Label>
                            <Input
                                autoComplete="username"
                                type="text"
                                name="password"
                                value={this.state.userName}
                                onChange={this.onChangeField.bind(this, 'userName')}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChangeField.bind(this, 'email')}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangeField.bind(this, 'password')}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                name="confirmedPassword"
                                value={this.state.confirmedPassword}
                                onChange={this.onChangeField.bind(this, 'confirmedPassword')}
                            />
                        </FormGroup>
                        <Button color="info" onClick={this.signUp}>Sign Up</Button>
                    </Form>
                </Container>
            </div >
        );
    }
}

export const Signup = connect(
    (state: RootState) => ({ isSignedUp: state.auth.isSignedUp }),
    (dispatch: Dispatch<LoginActions>) => ({
        signUp: (userName: string, email: string, password: string): Promise<void> =>
            dispatch(signUpUser(userName, email, password))
    })
)(PureSignUp);
