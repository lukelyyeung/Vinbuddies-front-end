import React, { Component } from "react";
import { connect } from 'react-redux';
import { loginUser, jwtLogin } from '../actions/auth-action';
import { Redirect } from 'react-router';
import { LoginForm } from './Forms/LoginForm';
import { Container, Row, Col } from 'reactstrap';
import { FbLogin } from './facebook-login';
import { getUserProfile } from '../actions/userProfile-action';
import * as bodyStyle from './settings/bodyStyle';

// Login page component

export class PureLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };
  }

  login = async (values) => {
    await this.props.login(values.email, values.password);
    if (this.props.isAuthenticated) {
      this.setState({ redirectToReferrer: true });
    }
  }

  async componentDidMount() {
    let token = localStorage.getItem('token');
    if (token) {
      await this.props.jwtLogin(token);
    }
    if (this.props.isAuthenticated) {
      this.setState({ redirectToReferrer: true });
    }
  }

  async componentWillUnmount() {
    let token = localStorage.getItem('token');
    if (token !== null && this.props.userProfile.userId === 0) {
      await this.props.getUserProfile(token);
    }
    for (const i of Object.keys(bodyStyle.login)) {
      document.body.style[i] = null;
    }
  }

  async componentWillMount() {
    for (const i of Object.keys(bodyStyle.login)) {
      document.body.style[i] = bodyStyle.login[i];
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <Container className="dashboard non-homepage">
        <Row>
          <Col xs="12" md="5">
            <LoginForm onSubmit={this.login} />
          </Col>
          <hr />
          <Col xs="12" md="2" className="flexBox-row"><h1>OR</h1></Col>
          <hr />
          <Col xs="12" md="5" className="flexBox-row">
            <FbLogin location={this.props.location}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export const Login = connect(
  (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    userProfile: state.profile
  }),
  (dispatch) => ({
    login: (email, password) => dispatch(loginUser(email, password)),
    getUserProfile: (token) => dispatch(getUserProfile(token)),
    jwtLogin: (token) => dispatch(jwtLogin(token))
  }))(PureLogin);
