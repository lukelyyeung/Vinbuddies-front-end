import * as React from 'react';
import { connect } from 'react-redux';
import { RouteProps, RouteComponentProps } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import { RootState } from '../store';

export interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

export const PurePrivateRoute = ({ component, isAuthenticated, ...rest }: PrivateRouteProps) => {
  const Component = component;
  if (Component != null) {
    return (
      <Route
        {...rest}
        render={(props: RouteComponentProps<string>) => (
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

export const PrivateRoute = connect<PrivateRouteProps, {}, RouteProps>(
  (state: RootState) => ({ isAuthenticated: state.auth.isAuthenticated }),
  null, null, { pure: false })(PurePrivateRoute);