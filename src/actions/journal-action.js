import env from '../env';
import axios from 'axios';
const ENV = env.dev;

export const GET_JOURNAL_SUCCESS = 'GET_JOURNAL_SUCCESS';
export const SET_SEARCH_CRITERIA = 'SET_SEARCH_CRITERIA';
export const TAB_JOURNAL = 'TAB_JOURNAL';
export const GET_MORE_JOURNAL_SUCCESS = 'GET_MORE_JOURNAL_SUCCESS';
export const GET_JOURNAL_FAIL = 'GET_JOURNAL_FAIL';

function getJournalSuccess(jounral) {
  return {
    type: GET_JOURNAL_SUCCESS,
    journal: jounral
  };
}

function getMoreJournalSuccess(jounral) {
  return {
    type: GET_MORE_JOURNAL_SUCCESS,
    journal: jounral
  };
}

function getJournalFailure(message) {
  return {
    type: GET_JOURNAL_FAIL,
    message: message
  };
}

function tabJournalSuccess(tab) {
  return {
    type: TAB_JOURNAL,
    activeTab: tab
  };
}

function setSearchCriteria(criteria) {
  return {
    type: SET_SEARCH_CRITERIA,
    criteria: criteria
  };
}

function generateQueryString(query) {
  return Object.keys(query).map(key =>
    `${key}=${query[key]}`).join('&');
}

export function callJounral(query) {
  let token = localStorage.getItem('token');
  return (dispatch) => {
    return axios({
      method: 'GET',
      url: `${ENV.api_server}/eventjournal?${generateQueryString(query)}`,
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (response.data == null) {
          return dispatch(getJournalFailure('Unknown Error'));
        } else if (response.data.error) {
          return dispatch(getJournalFailure(response.data.err || ''));
        } else if (response.data.journals) {
          if (query.hasOwnProperty('offset')) {
            return dispatch(getMoreJournalSuccess(response.data.journals));
          }
          return dispatch(getJournalSuccess(response.data.journals));
        } else {
          return;
        }
      })
      .catch(err => {
        alert(`Error: ${err.response.status}\n Message: ${err.response.data.error}`);
      });
  };
}

export function tabJournal(tab) {
  return (dispatch) => {
    dispatch(tabJournalSuccess(tab));
  };
}

export function setCriteria(criteria) {
  return (dispatch) => {
    dispatch(setSearchCriteria(criteria));
  };
}
