import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { loginUser, LoginActions } from '../actions/auth-action';
import { RootState } from '../store';
import { Redirect } from 'react-router';
import { LoginForm } from './Forms/LoginForm';
import { Container, Row, Col } from 'reactstrap';
// import { Link } from 'react-router-dom';
import { FbLogin } from './facebook-login';

// Login page component
export interface LocationProp {
  state: {
    from: {
      pathname: string
    }
  };
}

interface LoginProps extends LocationProp {
  location: LocationProp;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface LoginState {
  // email: string;
  // password: string;
  redirectToReferrer: boolean;
}

interface Credentials {
  email: string;
  password: string;
}

export class PureLogin extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };
  }

  login = async (values: Credentials) => {
    await this.props.login(values.email, values.password);
    if (this.props.isAuthenticated) {
      this.setState({ redirectToReferrer: true });
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <div className="modalBox">
        <Container>
          <Row>
            <Col xs="12" md="5">
                <LoginForm onSubmit={this.login} />
            </Col>
            <hr />
            <Col xs="12" md="2" className="flexBox-row"><h1>OR</h1></Col>
            <hr />
            <Col xs="12" md="5" className="flexBox-row">
              <FbLogin location={this.props.location} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export const Login = connect(
  (state: RootState) => ({ isAuthenticated: state.auth.isAuthenticated }),
  (dispatch: Dispatch<LoginActions>) => ({
    login: (email: string, password: string): Promise<void> => dispatch(loginUser(email, password))
  }))(PureLogin);
