import { authReducer } from './reducers/auth-reducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { eventReducer } from './reducers/event-reducer';

export interface RootState {
  auth: reduxRice.AuthState;
}

export const store = createStore(
  combineReducers({
    auth: authReducer,
    form: formReducer,
    events: eventReducer
  }),
  applyMiddleware(thunk, logger)
);