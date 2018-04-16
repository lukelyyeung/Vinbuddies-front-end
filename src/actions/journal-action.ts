import env from '../env';
const ENV = env.dev;
import { Dispatch } from 'redux';
import axios from 'axios';

export const GET_JOURNAL_SUCCESS = 'GET_JOURNAL_SUCCESS';
export type GET_JOURNAL_SUCCESS = typeof GET_JOURNAL_SUCCESS;

export const SET_SEARCH_CRITERIA = 'SET_SEARCH_CRITERIA';
export type SET_SEARCH_CRITERIA = typeof SET_SEARCH_CRITERIA;

export const TAB_JOURNAL = 'TAB_JOURNAL';
export type TAB_JOURNAL = typeof TAB_JOURNAL;

export const GET_MORE_JOURNAL_SUCCESS = 'GET_MORE_JOURNAL_SUCCESS';
export type GET_MORE_JOURNAL_SUCCESS = typeof GET_MORE_JOURNAL_SUCCESS;

export const GET_JOURNAL_FAIL = 'GET_JOURNAL_FAIL';
export type GET_JOURNAL_FAIL = typeof GET_JOURNAL_FAIL;

export interface SearchCriteria {
  orderby: string;
  limit: number;
  search: {
    searchType?: string;
    keyword?: string;
  };
  deleted?: boolean;
}

export interface GetJournalSuccessAction {
  type: GET_JOURNAL_SUCCESS;
  journal: any;
}

export interface SetSearchCriteriaAction {
  type: SET_SEARCH_CRITERIA;
  criteria: SearchCriteria;
}

export interface GetMoreJournalSuccessAction {
  type: GET_MORE_JOURNAL_SUCCESS;
  journal: any;
}

export interface GetJournalFailAction {
  type: GET_JOURNAL_FAIL;
  message: string;
}

export interface TabJournalAction {
  type: TAB_JOURNAL;
  activeTab: string;
}

export type GetJournalActions =
  GetJournalSuccessAction | GetJournalFailAction | GetMoreJournalSuccessAction |
  TabJournalAction | SetSearchCriteriaAction;

function getJournalSuccess(jounral: any) {
  return {
    type: GET_JOURNAL_SUCCESS,
    journal: jounral
  };
}

function getMoreJournalSuccess(jounral: any) {
  return {
    type: GET_MORE_JOURNAL_SUCCESS,
    journal: jounral
  };
}

function getJournalFailure(message: string) {
  return {
    type: GET_JOURNAL_FAIL,
    message: message
  };
}

function tabJournalSuccess(tab: string) {
  return {
    type: TAB_JOURNAL,
    activeTab: tab
  };
}

function setSearchCriteria(criteria: SearchCriteria) {
  return {
    type: SET_SEARCH_CRITERIA,
    criteria: criteria
  };
}

export interface JournalQuery {
  role?: string;
  orderby?: string;
  tag?: string;
  limit?: number | string;
  offset?: number | string;
  title?: string;
  date?: string;
  deleted?: boolean;
}

function generateQueryString(query: JournalQuery) {
  return Object.keys(query).map(key =>
    `${key}=${query[key]}`).join('&');
}

export function callJounral(query: JournalQuery) {
  let token = localStorage.getItem('token');
  return (dispatch: Dispatch<GetJournalActions>) => {
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

export function tabJournal(tab: string) {
  return (dispatch: Dispatch<GetJournalActions>) => {
    dispatch(tabJournalSuccess(tab));
  };
}

export function setCriteria(criteria: SearchCriteria) {
  return (dispatch: Dispatch<GetJournalActions>) => {
    dispatch(setSearchCriteria(criteria));
  };
}