import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import rootReducers from './reducers/rootReducer';

import NavBar from './components/Nav';
import Game from './components/Game';
import LoginForm from './container/loginContainer';
import RegisterForm from './container/registerContainer';
import Home from './container/homeContainer';

import mid from './middleWare';

const store = createStore(rootReducers, applyMiddleware(thunk, mid));
console.log(store.getState());
const a = (
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route exact path="/Game">
          <Game />
        </Route>
        <Route path="/login" component={LoginForm} />
        <Route path="/home" component={Home} />
        <Route path="/register" component={RegisterForm} />
      </Switch>
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(a, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
