import { Headers } from 'node-fetch';
import {
  SQUARES,
  WINNER_LINE,
  TURN,
  HISTORY,
  SORT
} from '../constants/ActionTypes';

const fetch = require('node-fetch');

export const addToBoard = (index, turn) => ({
  type: SQUARES.ADD,
  index,
  turn
});
export const removeFromBoard = index => ({
  type: SQUARES.REMOVE,
  index
});
export const reStart = () => ({
  type: SQUARES.RESET
});
export const changeBoardFromHis = (arr, isRemove) => ({
  type: SQUARES.MANY,
  arr,
  isRemove
});
export const changeTurn = () => ({
  type: TURN.CHANGE
});
export const setTurn = turn => ({
  type: TURN.SET,
  turn
});
export const winner = arr => ({
  type: WINNER_LINE.ADD,
  arr
});
export const RemoveWinner = () => ({
  type: WINNER_LINE.REMOVE
});
export const addToHis = (index, turn) => ({
  type: HISTORY.ADD,
  index,
  turn
});
export const RemoveHis = (from, to) => ({
  type: HISTORY.REMOVE,
  from,
  to
});
export const ReSetHis = () => ({
  type: HISTORY.RESET
});
export const ChangeHisIndex = index => ({
  type: HISTORY.CHANGE_INDEX,
  index
});
export const sort = () => ({
  type: SORT
});
export const setMessage = (message, title) => ({
  type: 'SET_MESSAGE',
  message,
  title
});
export const reSetMessage = () => ({
  type: 'RESET_MESSAGE'
});
export const loadInfo = () => (dispatch, getState) => {
  dispatch({ type: 'DOING' });
  return fetch('https://caroserver.herokuapp.com/me', {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${getState().user.token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  })
    .then(res => {
      console.log('...', res);
      try {
        return res.json();
      } catch (e) {
        return res;
      }
    })
    .then(res => {
      const result = JSON.parse(res);
      dispatch({ type: 'DONE' });
      if (result.code === 1) {
        console.log(result.data);
        dispatch({ type: 'update_info', user: result.data });
      } else {
        dispatch(setMessage('that bai', 'thang cong'));
      }
    })
    .catch(e => {
      console.log(e);
    });
};
export const register = (username, password, repassword, his) => dispatch => {
  dispatch({ type: 'DOING' });
  return fetch('https://khaicaro.herokuapp.com/user/register', {
    method: 'POST',
    body: JSON.stringify({ username, password, repassword }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(res => {
      const result = JSON.parse(res);
      dispatch({ type: 'DONE' });
      if (result.code === 1) {
        his.push('/login');
        dispatch(setMessage('thanh cong', 'thang cong'));
      } else {
        dispatch(setMessage('that bai', 'thang cong'));
        his.push('/reghister');
      }
    })
    .catch(e => {});
};
export const login = (username, password) => dispatch => {
  dispatch({ type: 'SET_LOGIN', index: 1 });
  console.log('logining ....', username, password);
  return fetch('https://khaicaro.herokuapp.com/user/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),

    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => {
      dispatch({ type: 'SET_LOGIN', index: 0 });
      return res.json();
    })
    .then(res => {
      const result = JSON.parse(res);
      console.log('done login ....', result);
      if (result.code === 1) {
        dispatch({ type: 'User_add', user: result.user, token: result.token });
        dispatch(setMessage('Đăng nhập thành công', 'THÀNH CÔNG'));
      } else {
        dispatch(setMessage('Đăng nhập không thành công', 'THẤT BẠI'));
      }
    })
    .catch(() => {});
};
export const logout = his => dispatch => {
  dispatch({ type: 'DOING' });
  return fetch('https://khaicaro.herokuapp.com/user/logout')
    .then(res => {
      dispatch({ type: 'User_reset' });
      return res.json();
    })
    .then(res => {
      const result = JSON.parse(res);

      if (result.code === 1) {
        console.log('reset');
        dispatch({ type: 'DONE' });
        dispatch({ type: 'reset_info' });
        his.push('/login');
      }
    })
    .catch(e => {});
};
