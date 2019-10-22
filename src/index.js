import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import rootReducers from './reducers/rootReducer';

import NavBar from './components/Nav';
import Game from './components/Game';
import LoginForm from './components/LoginForm';
import RegisterForm from './container/registerContainer';
import Home from './components/Home';

import mid from './middleWare';

const store = createStore(rootReducers, applyMiddleware(thunk, mid));
console.log(store.getState());
const a = (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/Game">
          <Game />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/home">
          <NavBar />
          <Home />
        </Route>
        <Route path="/logout" />
        <Route path="/register">
          <RegisterForm />
        </Route>
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(a, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
