import { authReducer } from './reducers/auth-reducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { journalReducer } from './reducers/journal-reducer';
import { userProfileReducer } from './reducers/userProfile-reducer';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { alertReducer } from './reducers/alert-action';
const history = createHistory();
const middleware = routerMiddleware(history);

export const store = createStore(
  combineReducers({
    auth: authReducer,
    form: formReducer,
    events: journalReducer,
    profile: userProfileReducer,
    router: routerReducer,
    alert: alertReducer
  }),
  applyMiddleware(thunk, middleware, logger)
);
