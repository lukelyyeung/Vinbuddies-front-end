export const ALERT_ERROR = 'ALERT_ERROR';
export const NO_ALERT = 'NO_ALERT';
export const ALERT_SUCCESS = 'ALERT_SUCCESS';
export const ALERT_INFO = 'ALERT_INFO';
export const ALERT_LOADING = 'ALERT_LOADING';
export function alertError(message) {
    return (dispatch) => dispatch(
        {
            type: ALERT_ERROR,
            message: message
        });
}

export function alertInfo(message) {
    return (dispatch) => dispatch(
        {
            type: ALERT_INFO,
            message: message
        });
}

export function alertSuccess(message) {
    return (dispatch) => dispatch(
        {
            type: ALERT_SUCCESS,
            message: message
        });
}

export function alertLoading() {
    return (dispatch) => dispatch(
        {
            type: ALERT_LOADING
        });
}
