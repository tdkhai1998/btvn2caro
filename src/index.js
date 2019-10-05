import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import * as serviceWorker from './serviceWorker';
import rootReducers from './reducers/rootReducer';
import Board from './container/boardContainer';
import Controls from './container/controlContainer';
import SideBar from './container/sideBarContainer';
import mid from './middleWare';

const store = createStore(rootReducers, applyMiddleware(mid));
const a = (
  <Provider store={store}>
    <div className="flex-container">
      <Board />
      <div style={{ paddingTop: 10, width: 500 }}>
        <Controls />
        <SideBar />
      </div>
    </div>
  </Provider>
);

ReactDOM.render(a, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
