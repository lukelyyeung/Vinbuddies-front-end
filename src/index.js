import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './css/main.scss';
import { store } from './store';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Main } from './components/Main';
const history = createHistory();

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Main />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
