import fetch, { Headers } from 'node-fetch';
import {
  FetchDoing,
  FetchDone,
  ResetInfoUser,
  AddUser,
  SetMessage,
  UpdateInfoUser,
  HideModal,
  SetUrlBack
} from '../Redux';

const config = require('../Config');

const serverHost = config.default;

const TITLE = {
  SUCCESSFUL: 'THÀNH CÔNG',
  FAILED: 'THẤT BẠI',
  ERROR: 'LỖI'
};

export const loadInfo = () => (dispatch, getState) => {
  dispatch(FetchDoing());
  console.log('LoadInfo ....');
  return fetch(`${serverHost}/me`, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${getState().user.token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  })
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(res => {
      const result = JSON.parse(res);
      console.log(result);
      if (result.code === 1) {
        result.data.fetched = true;
        dispatch(UpdateInfoUser(result.data));
      } else {
        dispatch(UpdateInfoUser({ fetched: true }));
        dispatch(SetMessage('LẤY THÔNG TIN THẤT BẠI', 'THẤT BẠI'));
      }
    })
    .catch(e => {
      console.log('Loadinfoerr', e.message);
      dispatch(UpdateInfoUser({ fetched: false }));
      dispatch(SetMessage(e.message, 'LỖI'));
    })
    .finally(() => {
      dispatch(FetchDone());
    });
};
export const updateInfoUser = entityUser => dispatch => {
  dispatch(FetchDoing());
  const url = `${serverHost}/user/${entityUser.id}`;
  const options = {
    method: 'PUT',
    body: JSON.stringify(entityUser),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return fetch(url, options)
    .catch(e => {
      dispatch(SetMessage(e.message, 'LỖI'));
    })
    .finally(() => {
      dispatch(FetchDone());
    });
};
export const logout = his => dispatch => {
  dispatch(FetchDoing());
  return fetch(`${serverHost}/user/logout`)
    .then(res => {
      return res.json();
    })
    .then(res => {
      const result = JSON.parse(res);
      if (result.code === 1) {
        dispatch(FetchDone());
        dispatch(ResetInfoUser());
        his.push('/login');
      }
    })
    .catch(e => {
      dispatch(SetMessage(e.message, 'LỖI'));
    })
    .finally(() => {
      dispatch(FetchDone());
    });
};

export const changePassword = (oldPass, newPass) => (dispatch, getState) => {
  dispatch(FetchDoing());
  const { user } = getState();
  const url = `${serverHost}/user/changePassword`;
  const options = {
    method: 'POST',
    body: JSON.stringify({ oldPass, newPass, username: user.user }),
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return fetch(url, options)
    .then(res => {
      return res.json();
    })
    .then(json => {
      const result = JSON.parse(json);
      if (result.code === 1) {
        dispatch(HideModal());
        dispatch(SetMessage('Cập nhật password thành công', 'Thành Công'));
      } else {
        dispatch(
          SetMessage(
            `Cập nhật password không thành công  ${result.message}`,
            'Thất bại'
          )
        );
      }
    })
    .catch(e => {
      dispatch(SetMessage(e.message, 'LỖI'));
    })
    .finally(() => {
      dispatch(FetchDone());
    });
};

export const login = (username, password) => dispatch => {
  dispatch(FetchDoing());
  const url = `${serverHost}/user/login`;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(res => {
      const result = JSON.parse(res);
      console.log(result);
      if (result.code === 1) {
        dispatch(AddUser(result.user, result.token));
        dispatch(SetMessage('Đăng nhập thành công', 'THÀNH CÔNG'));
        dispatch(SetUrlBack('/home'));
      } else {
        dispatch(SetMessage('Đăng nhập không thành công', 'THẤT BẠI'));
      }
    })
    .catch(e => {
      dispatch(SetMessage(e.message, 'LỖI'));
    })
    .finally(() => {
      dispatch(FetchDone());
    });
};

export const register = (username, password, repassword) => dispatch => {
  dispatch(FetchDoing());
  console.log('register...', username, password, repassword);

  return fetch(`${serverHost}/user/register`, {
    method: 'POST',
    body: JSON.stringify({ username, password, repassword }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(r => r.json())
    .then(res => {
      console.log(res);
      const result = JSON.parse(res);
      if (result.code === 1) {
        dispatch(SetMessage(result.message, TITLE.SUCCESSFUL));
        dispatch(SetUrlBack('/login'));
      } else {
        dispatch(SetMessage(result.message, TITLE.FAILED));
      }
    })
    .catch(e => {
      dispatch(SetMessage(e.message, TITLE.ERROR));
    })
    .finally(() => {
      dispatch(FetchDone());
    });
};
