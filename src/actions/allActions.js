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
export const register = (username, password, repassword, his) => dispatch => {
  dispatch({ type: 'DOING' });
  return fetch('http://localhost:3001/user/register', {
    method: 'POST',
    body: JSON.stringify({ username, password, repassword }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(res => {
      const result = JSON.parse(res);
      dispatch({ type: 'DONE' });
      if (result.code === 1) {
        alert('Đăng ký thành công');
        his.push('/login');
      } else {
        alert('Đăng ký thành công');
        his.push('/reghister');
      }
    })
    .catch(e => {});
};
export const login = (username, password, his) => dispatch => {
  dispatch({ type: 'SET_LOGIN', index: 1 });
  return fetch('http://localhost:3001/user/login', {
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
      if (result.code === 1) {
        dispatch({ type: 'User_add', user: result.user, token: result.token });
        his.push('/home');
        alert('Đăng nhập thành công');
      } else {
        his.push('/login');
        alert('Thất bại');
      }
    })
    .catch(e => {});
};
export const logout = his => dispatch => {
  return fetch('http://localhost:3001/user/logout')
    .then(res => {
      dispatch({ type: 'User_reset' });
      return res.json();
    })
    .then(res => {
      const result = JSON.parse(res);
      if (result.code === 1) {
        his.push('/login');
      }
    })
    .catch(e => {});
};
