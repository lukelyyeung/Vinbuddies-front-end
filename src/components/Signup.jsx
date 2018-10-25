import React, { Component } from "react";
import { ModalHeader, ModalBody, Modal, Button, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { signUpUser } from "../actions/auth-action";
import { Redirect } from "react-router";
import { SignupForm } from "./Forms/SignUpFrom";

class PureSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToHome: false,
      isOpen: false
    };
    this.signUp = this.signUp.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  async signUp(values) {
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
        <Button color="info" onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
        <Modal isOpen={this.state.isOpen} size="md">
          <ModalHeader>Sign up in VinBuddies</ModalHeader>
          <ModalBody>
            <SignupForm onSubmit={this.signUp} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export const Signup = connect(
  (state) => ({ isSignedUp: state.auth.isSignedUp }),
  (dispatch) => ({
    signUp: (userName, email, password) => dispatch(signUpUser(userName, email, password))
  })
)(PureSignUp);
