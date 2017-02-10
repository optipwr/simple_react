import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, browserHistory, useRouterHistory} from 'react-router';
import { createHistory } from 'history'
import reducers from './reducers';
import routes from './routes';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(
  promise, thunk
)(createStore);

const history = useRouterHistory(createHistory)({
  basename: '/ocm'
})



ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={history} routes={routes} />
  </Provider>
  , document.querySelector('.container-fluid'));