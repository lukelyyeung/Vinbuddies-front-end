import env from '../env';
const ENV = env.dev;
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import { Dispatch } from 'redux';
import axios from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;

export interface LoginSuccessAction {
  type: LOGIN_SUCCESS;
}

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export type SIGNUP_SUCCESS = typeof SIGNUP_SUCCESS;

export interface SingupSuccessAction {
  type: SIGNUP_SUCCESS;
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export type LOGOUT_SUCCESS = typeof LOGOUT_SUCCESS;

export interface LogoutSuccessAction {
  type: LOGOUT_SUCCESS;
}

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export type LOGIN_FAILURE = typeof LOGIN_FAILURE;

export interface LoginFailureAction {
  type: LOGIN_FAILURE;
  message: string;
}

export type LoginActions = LoginSuccessAction | LoginFailureAction | LogoutSuccessAction | SingupSuccessAction;

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS
  };
}

export function signUpSuccess() {
  return {
    type: SIGNUP_SUCCESS
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  };
}

export function loginFailure(message: string) {
  return {
    type: LOGIN_FAILURE,
    message: message
  };
}

export function loginUser(email: string, password: string) {
  return (dispatch: Dispatch<LoginActions>) => {
    return axios
      .post<APIResponse.login>(
        `${ENV.api_server}/auth/login`,
        {
          email: email,
          password: password
        }
      )
      .then(response => {
        if (response.data == null) {
          dispatch(loginFailure('Unknown Error'));
        } else if (response.data.error) {
          dispatch(loginFailure(response.data.error || ''));
        } else if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          dispatch(loginSuccess());
        }
      })
      .catch(err => alert(`Error: ${err.response.status}\n Message: ${err.response.data.error}`));
  };
}

export function signUpUser(userName: string, email: string, password: string) {
  return (dispatch: Dispatch<LoginActions>) => {
    return axios
      .post<APIResponse.signUp>(
        `${ENV.api_server}/auth/signup`,
        {
          username: userName,
          email: email,
          password: password
        }
      )
      .then(response => {
        if (response.data == null) {
          dispatch(loginFailure('Unknown Error'));
        } else if (!response.data.userId) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginFailure(response.data.error || ''));
        } else {
          // If login was successful, set the token in local storage
          // Dispatch the success action
          dispatch(signUpSuccess());
        }
      })
      .catch(err => alert(`Error: ${err.response.status}\n Message: ${err.response.data.error}`));
  };
}

export function FbLoginUser(userInfo: ReactFacebookLoginInfo & { accessToken: string }) {
  return (dispatch: Dispatch<LoginActions>) => {
    return axios
      .post<{ token: string; status?: string; error?: string }>(
        `${ENV.api_server}/auth/facebook`,
        { accessToken: userInfo.accessToken }
      )
      .then(response => {
        if (response.data == null) {
          dispatch(loginFailure('Unknown Error'));
        } else if (!response.data.token) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginFailure(response.data.error || ''));
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('token', response.data.token);
          // Dispatch the success action
          dispatch(loginSuccess());
        }
      })
      .catch(err => alert(`Error: ${err.response.status}\n Message: ${err.response.data.error}`));
  };
}

export function logout() {
  return (dispatch: Dispatch<LoginActions>) => {
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
  };
}