import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store';
import { Navigation } from './components/navigation';

const App = () => (
  <Provider store={store}>
    <Router>
      <Navigation />
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));