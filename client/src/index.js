import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import './index.less';
import 'semantic-ui-less/semantic.less'
import App from './App';
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
