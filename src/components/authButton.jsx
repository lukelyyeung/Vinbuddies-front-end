import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth-action';

const PureAuthButton = ({ isAuthenticated, signOut }) => {
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
  (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isSignedUp: state.auth.isSignedUp
  }),
  (dispatch) => ({
    signOut: () => dispatch(logout()),
  }))(PureAuthButton);
