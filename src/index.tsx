import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';
import { store } from './store';
import { Navigation } from './components/navigation';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Navigation />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));