import { authReducer } from './reducers/auth-reducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export interface RootState {
  auth: reduxRice.AuthState;
}

export const store = createStore(
  combineReducers({
    auth: authReducer
  }),
  applyMiddleware(thunk, logger)
);