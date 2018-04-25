import env from '../env';
const ENV = env.dev;
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import { Dispatch } from 'redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { generalAlert } from '../components/settings/alertSetting';
import { messageMap } from '../reponseConstant';

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
          toast.success(response.data.status, generalAlert);
        }
      })
      .catch(err => toast.error(err.response.data.error, generalAlert));
  };
}

export function signUpUser(userName: string, email: string, password: string) {
  return (dispatch: Dispatch<LoginActions>) => {
    const loadingId = toast('Logging in...', generalAlert);
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
          dispatch(loginFailure(response.data.error || ''));
        } else {
          dispatch(signUpSuccess());
          if (response.data.status) {
            toast.update(loadingId, {
              render: messageMap[response.data.status],
              type: 'success'
            });
          }
        }
      })
      .catch(err => toast.update(loadingId, {
        render: messageMap[err.response.data.error],
        type: 'error'
      }));
  };
}

export function FbLoginUser(userInfo: ReactFacebookLoginInfo & { accessToken: string }) {
  return (dispatch: Dispatch<LoginActions>) => {
    const loadingId = toast('Logging in...', generalAlert);
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
          if (response.data.status) {
            toast.update(loadingId, {
              render: messageMap[response.data.status],
              type: 'success'
            });
          }
        }
      })
      .catch(err => toast.update(loadingId, {
        render: messageMap[err.response.data.error],
        type: 'error'
      }));
  };
}

export function jwtLogin(JWTtoken: string) {
  return (dispatch: Dispatch<LoginActions>) => {
    return axios({
      method: 'POST',
      url: `${ENV.api_server}/auth/jwt`,
      headers: { Authorization: `Bearer ${JWTtoken}` }
    })
      .then(response => {
        if (response.data == null) {
          return dispatch(loginFailure('Unknown Error'));
        } else if (response.data.error) {
          return dispatch(loginFailure(response.data.error || ''));
        } else {
          if (response.data.status) {
            toast.success(messageMap[response.data.status], generalAlert);
          }

          return dispatch(loginSuccess());
        }
      })
      .catch(err => {
        toast.error(messageMap[err.response.data.error], generalAlert);
      });
  };
}

export function logout() {
  return (dispatch: Dispatch<LoginActions>) => {
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
  };
}