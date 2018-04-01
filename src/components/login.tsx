import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { loginUser, LoginActions } from '../actions/auth-action';
import { RootState } from '../store';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router';
import { FbLogin } from './facebook-login';
import { Link } from 'react-router-dom';

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
  email: string;
  password: string;
  redirectToReferrer: boolean;
}

class PureLogin extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirectToReferrer: false
    };
  }

  onChangeField = (field: 'eamil' | 'password', e: React.FormEvent<HTMLInputElement>) => {
    const state = {};
    state[field] = e.currentTarget.value;

    this.setState(state);
  }

  login = async () => {
    await this.props.login(this.state.email, this.state.password);
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
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    autoComplete="email"
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="example@email.com"
                    value={this.state.email}
                    onChange={this.onChangeField.bind(this, 'email')}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    autoComplete="current-password"
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.onChangeField.bind(this, 'password')}
                  />
                </FormGroup>
                <Button color="success" onClick={this.login}>Login</Button>
                <span><Link to="/signup"><Button color="info">Sign up</Button></Link></span>
              </Form>
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
