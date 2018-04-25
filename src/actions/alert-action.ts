import { Dispatch } from 'redux';

export const ALERT_ERROR = 'ALERT_ERROR';
type ALERT_ERROR = typeof ALERT_ERROR;

export const NO_ALERT = 'NO_ALERT';
type NO_ALERT = typeof NO_ALERT;

export const ALERT_SUCCESS = 'ALERT_SUCCESS';
type ALERT_SUCCESS = typeof ALERT_SUCCESS;

export const ALERT_INFO = 'ALERT_INFO';
type ALERT_INFO = typeof ALERT_INFO;

export const ALERT_LOADING = 'ALERT_LOADING';
type ALERT_LOADING = typeof ALERT_LOADING;

export interface AlertErrorAction {
    type: ALERT_ERROR;
    message: string;
}

export interface AlertSuccessAction {
    type: ALERT_SUCCESS;
    message: string;
}

export interface AlertInfoAction {
    type: ALERT_INFO;
    message: string;
}

export interface AlertLoadingAction {
    type: ALERT_LOADING;
}

export type AlertActions = AlertErrorAction | AlertInfoAction | AlertSuccessAction |
    AlertLoadingAction;

export function alertError(message: string) {
    return (dispatch: Dispatch<AlertErrorAction>) => dispatch(
        {
            type: ALERT_ERROR,
            message: message
        });
}

export function alertInfo(message: string) {
    return (dispatch: Dispatch<AlertInfoAction>) => dispatch(
        {
            type: ALERT_INFO,
            message: message
        });
}

export function alertSuccess(message: string) {
    return (dispatch: Dispatch<AlertSuccessAction>) => dispatch(
        {
            type: ALERT_SUCCESS,
            message: message
        });
}

export function alertLoading(message: string) {
    return (dispatch: Dispatch<AlertLoadingAction>) => dispatch(
        {
            type: ALERT_LOADING
        });
}