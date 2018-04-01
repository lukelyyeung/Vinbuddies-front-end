import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { RootState } from '../store';
import { LoginActions, logout } from '../actions/auth-action';

interface AuthButtonProp extends reduxRice.AuthState {
  isAuthenticated: boolean;
  signOut: () => void;
}

const PureAuthButton = ({ isAuthenticated, signOut }: AuthButtonProp) => {
  return (
    <div>
      {isAuthenticated ? (
        <Link className="nav-link" to="/" onClick={signOut}>Logout</Link>
      ) : (
          <Link className="nav-link" to="/login">Login</Link>
        )
      }
    </div>
  );
};

export const AuthButton = connect(
  (state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isSignedUp: state.auth.isSignedUp
  }),
  (dispatch: Dispatch<LoginActions>) => ({
    signOut: (): void => dispatch(logout()),
  }))(PureAuthButton);