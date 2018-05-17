import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { loginUser, LoginActions, jwtLogin } from '../actions/auth-action';
import { RootState } from '../store';
import { Redirect } from 'react-router';
import { LoginForm } from './Forms/LoginForm';
import { Container, Row, Col } from 'reactstrap';
import { FbLogin } from './facebook-login';
import { ProfileAction, getUserProfile } from '../actions/userProfile-action';
import { reduxRice } from '../module';
import * as bodyStyle from '../components/settings/bodyStyle';

// Login page component
export interface LocationProp {
  state: {
    from: {
      pathname: string
    }
  };
}

interface LoginProps extends LocationProp {
  userProfile: reduxRice.UserProfileState;
  location: LocationProp;
  login: (email: string, password: string) => Promise<void>;
  getUserProfile: (token: string) => Promise<any> | any;
  logout: () => void;
  jwtLogin: (token: string) => Promise<any>;
  isAuthenticated: boolean;
}

interface LoginState {
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
    // const { from } = { from: { pathname: '/' } };
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
  (state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    userProfile: state.profile
  }),
  (dispatch: Dispatch<LoginActions | ProfileAction>) => ({
    login: (email: string, password: string): Promise<void | number> => dispatch(loginUser(email, password)),
    getUserProfile: (token: string): Promise<any> | any => dispatch(getUserProfile(token)),
    jwtLogin: (token: string): Promise<any> => dispatch(jwtLogin(token))
  }))(PureLogin);
