import { setMessage } from '../actions/allActions';

const fetch = require('node-fetch');

const register = (username, password, repassword, his) => dispatch => {
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
        dispatch(setMessage('Đăng ký thành công', 'Thành công'));
      } else {
        dispatch(setMessage('Đăng ký thất bại', 'Thất bại'));
        his.push('/register');
      }
    })
    .catch(e => dispatch(setMessage(e.message, 'Thất bại')));
};
export default register;
