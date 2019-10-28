import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import * as serviceWorker from './serviceWorker';
import rootReducers from './reducers/rootReducer';
import Game from './Components/Game';
import LoginForm from './container/loginContainer';
import RegisterForm from './container/registerContainer';
import Home from './container/homeContainer';
import mid from './middleWare';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

const peristedState = loadState();

const store = createStore(
  rootReducers,
  peristedState,
  applyMiddleware(thunk, mid)
);
store.subscribe(() => {
  saveState(store.getState());
});

const a = (
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={LoginForm} />
        <Route exact path="/Game" component={Game} />
        <Route path="/home" component={Home} />
        <Route path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(a, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
