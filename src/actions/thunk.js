const fetch = require('node-fetch');
const action = require('./allActions');

export const y = {};
const hostUrl = 'http://localhost:8080';

export const loginFacebook = userFacebook => dispatch => {
  dispatch({ type: 'DOING' });
  console.log('logining facebook ....');
  return fetch(`${hostUrl}/user/loginFace`, {
    method: 'POST',
    body: JSON.stringify(userFacebook),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => {
      dispatch({ type: 'DONE' });
      return res.json();
    })
    .then(res => {
      const result = JSON.parse(res);
      console.log('done login facebook....', result);
      if (result.code === 1) {
        dispatch({ type: 'User_add', user: result.user, token: result.token });
        dispatch(action.setMessage('Đăng nhập thành công', 'THÀNH CÔNG'));
      } else {
        dispatch(action.setMessage('Đăng nhập không thành công', 'THẤT BẠI'));
      }
    })
    .catch(e =>
      dispatch(
        action.setMessage(
          `Đăng nhập không thành công: ${e.message}`,
          'THẤT BẠI'
        )
      )
    );
};
