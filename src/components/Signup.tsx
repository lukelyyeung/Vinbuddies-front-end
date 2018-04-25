import * as React from 'react';
import { ModalHeader, ModalBody, Modal, Button, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { LoginActions, signUpUser } from '../actions/auth-action';
import { Redirect } from 'react-router';
import { RootState } from '../store';
import { SignupForm } from './Forms/SignUpFrom';

interface SignUpProps {
    isSignedUp: boolean;
    buttonLabel: string;
    signUp: (
        userName: string,
        email: string,
        password: string
    ) => Promise<void>;
}

interface SignUpState {
    redirectToHome: boolean;
    isOpen: boolean;
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
            redirectToHome: false,
            isOpen: false
        };
        this.signUp = this.signUp.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    async signUp(values: SignupValues) {
        await this.props.signUp(values.username, values.email, values.password);
        if (this.props.isSignedUp) {
            this.setState({ redirectToHome: true });
        }
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {

        if (this.state.redirectToHome) {
            return <Redirect to="/login" />;
        }
        return (
            <div>
                <Button color="info" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal
                    isOpen={this.state.isOpen}
                    size="md"
                >
                    <ModalHeader>Sign up in VinBuddies</ModalHeader>
                    <ModalBody>
                        <SignupForm onSubmit={this.signUp} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export const Signup = connect(
    (state: RootState) => ({ isSignedUp: state.auth.isSignedUp }),
    (dispatch: Dispatch<LoginActions>) => ({
        signUp: (userName: string, email: string, password: string): Promise<void | number> =>
            dispatch(signUpUser(userName, email, password))
    })
)(PureSignUp);
