import * as React from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { LoginActions, signUpUser } from '../actions/auth-action';
import { Redirect } from 'react-router';
import { RootState } from '../store';
import { SignupForm } from './Forms/SignUpFrom';

interface SignUpProps {
    isSignedUp: boolean;
    signUp: (
        userName: string,
        email: string,
        password: string
    ) => Promise<void>;
}

interface SignUpState {
    redirectToHome: boolean;
}

interface SignupValues {
    username: string;
    email: string;
    password: string;
}

class PureSignUp extends React.Component<SignUpProps, SignUpState> {
    constructor(props: SignUpProps) {
        super(props);
        this.state = {
            redirectToHome: false
        };
    }

    signUp = async (values: SignupValues) => {
        await this.props.signUp(values.username, values.email, values.password);
        if (this.props.isSignedUp) {
            this.setState({ redirectToHome: true });
        }
    }

    render() {

        if (this.state.redirectToHome) {
            return <Redirect to="/login" />;
        }
        return (
            <Container className="dashboard">
                <SignupForm onSubmit={this.signUp} />
            </Container>
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
