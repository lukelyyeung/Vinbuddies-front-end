import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, SIGNUP_SUCCESS } from '../actions/auth-action';
const initialAuthState = { isAuthenticated: false, isSignedUp: false };

export function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS: {
      return { ...state, isSignedUp: true };
    }
    case LOGIN_SUCCESS: {
      return { ...state, isAuthenticated: true };
    }
    case LOGIN_FAILURE: {
      return { ...state, isAuthenticated: false };
    }
    case LOGOUT_SUCCESS: {
      return undefined;
    }
    default: {
      return state;
    }
  }
}
