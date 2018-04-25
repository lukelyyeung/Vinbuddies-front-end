import { reduxRice } from '../module';
import { NO_ALERT, ALERT_SUCCESS, AlertActions, ALERT_ERROR, ALERT_LOADING, ALERT_INFO } from '../actions/alert-action';
const initialAlertState = { type: NO_ALERT, message: null };

export function alertReducer(state: reduxRice.AlertState = initialAlertState, action: AlertActions) {
  switch (action.type) {
    case ALERT_SUCCESS: {
      return { type: ALERT_SUCCESS, message: action.message };
    }
    case ALERT_ERROR: {
        return { type: ALERT_ERROR, message: action.message };
    }
    case ALERT_LOADING: {
        return { type: ALERT_LOADING };
    }
    case ALERT_INFO: {
        return { type: ALERT_INFO};
    }
    default: {
      return state;
    }
  }
}