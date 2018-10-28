import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import { connect } from "react-redux";
import { FbLoginUser } from "../actions/auth-action";
import { Redirect } from "react-router";
const { REACT_FB_APP_ID } = process.env;

class PureFbLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };
  }

  responseFacebook = async userInfo => {
    await this.props.login(userInfo);
    if (this.props.isAuthenticated) {
      this.setState({ redirectToReferrer: true });
    }
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        <FacebookLogin
          appId={REACT_FB_APP_ID}
          autoLoad={false}
          fields="name,email,picture,accessToken"
          callback={this.responseFacebook}
        />
      </div>
    );
  }
}

export const FbLogin = connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated,
    userProfile: state.profile
  }),
  dispatch => ({
    login: userInfo => dispatch(FbLoginUser(userInfo))
  })
)(PureFbLogin);
