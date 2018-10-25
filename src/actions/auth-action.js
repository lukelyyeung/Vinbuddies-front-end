import env from '../env';
import axios from 'axios';
import { toast } from 'react-toastify';
import { generalAlert } from '../components/settings/alertSetting';
import { messageMap } from '../reponseConstant';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
const ENV = env.dev;

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

export function loginFailure(message) {
  return {
    type: LOGIN_FAILURE,
    message: message
  };
}

export function loginUser(email, password) {
  return (dispatch) => {
    return axios
      .post(
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

export function signUpUser(userName, email, password) {
  return (dispatch) => {
    const loadingId = toast('Logging in...', generalAlert);
    return axios
      .post(
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

export function FbLoginUser(userInfo) {
  return (dispatch) => {
    const loadingId = toast('Logging in...', generalAlert);
    return axios
      .post(
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

export function jwtLogin(JWTtoken) {
  return (dispatch) => {
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
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
  };
}
