import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { RootState } from '../store';
import { LoginActions, logout } from '../actions/auth-action';
import { reduxRice } from '../module';

interface AuthButtonProp extends reduxRice.AuthState {
  isAuthenticated: boolean;
  signOut: () => void;
}

const PureAuthButton = ({ isAuthenticated, signOut }: AuthButtonProp) => {
  return (
    <div>
      <Link
        className="nav-link"
        to={isAuthenticated ? '/' : '/login'}
        onClick={isAuthenticated ? signOut : (() => null)}
      >
        {isAuthenticated ? 'Logout' : 'Login'}
      </Link>
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