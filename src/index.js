import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import * as serviceWorker from './serviceWorker';
import rootReducers from './reducers/rootReducer';
import Board from './container/boardContainer';
import mid from './middleWare';

const store = createStore(rootReducers, applyMiddleware(mid));
console.log(store.getState())
const a = (
  <Provider store={store}>
    <Board />
  </Provider>
);

ReactDOM.render(a, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
