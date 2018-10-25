import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PurePrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  const Component = component;
  if (Component != null) {
    return (
      <Route
        {...rest}
        render={(props) => (
          isAuthenticated ? (<Component {...props} />)
            : (<Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />)
        )}
      />);
  } else {
    return null;
  }
};

export const PrivateRoute = connect(
  (state) => ({ isAuthenticated: state.auth.isAuthenticated }),
  null, null, { pure: false })(PurePrivateRoute);
