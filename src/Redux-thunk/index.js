import fetch, { Headers } from 'node-fetch';
import {
  FetchDoing,
  FetchDone,
  ResetInfoUser,
  AddUser,
  SetMessage,
  UpdateInfoUser,
  HideModal,
  SetUrlBack,
  UpdateFields,
  ResetFieldCanUpdate,
  ResetUser
} from '../Redux';
// import { fieldUpdate } from '../Redux/FieldsUpdate';

// import { UpdateFieldCanUpdate } from '../Redux/FieldsUpdate/action';

const config = require('../Config');

const serverHost = config.default;

const TITLE = {
  SUCCESSFUL: 'THÀNH CÔNG',
  FAILED: 'THẤT BẠI',
  ERROR: 'LỖI'
};
const FieldsCanUpdate = (username, dispatch) => {
  console.log('FILEDCANUPSATE', username);
  const fields = {};
  if (username.indexOf('gg') === 0) {
    fields.hoten = false;
    fields.avatar = false;
    fields.password = false;
  } else if (username.indexOf('fb') === 0) {
    fields.hoten = false;
    fields.gioitinh = false;
    fields.ngaysinh = false;
    fields.avatar = false;
    fields.password = false;
  }
  console.log(fields);
  dispatch(UpdateFields(fields));
};
export const loadInfo = () => (dispatch, getState) => {
  dispatch(FetchDoing());
  console.log('LoadInfo ....');
  const { user } = getState();
  console.log(user);
  if (!user) {
    dispatch(FetchDone());
  } else {
    return fetch(`${serverHost}/me`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(res => {
        const result = JSON.parse(res);
        console.log('result... info', result);
        if (result.code === 1) {
          result.data.fetched = true;
          console.log(result.data);
          FieldsCanUpdate(user.user, dispatch);
          console.log('data-fetch', result);
          result.data.gioitinh = result.data.gioitinh === 0;
          dispatch(UpdateInfoUser(result.data));
        } else {
          dispatch(UpdateInfoUser({ fetched: true }));
          dispatch(SetMessage(result.error, 'THẤT BẠI'));
        }
      })
      .catch(e => {
        console.log('Loadinfoerr', e.message);

        dispatch(SetMessage(e.message, 'LỖI'));
      })
      .finally(() => {
        dispatch(UpdateInfoUser({ fetched: true }));
        dispatch(FetchDone());
      });
  }
};

export const updateInfoUser = mess => (dispatch, getState) => {
  dispatch(FetchDoing());
  console.log('update....');
  const { infoUser } = getState();
  const url = `${serverHost}/user`;
  const options = {
    method: 'PUT',
    body: JSON.stringify(infoUser),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return fetch(url, options)
    .then(() => {
      dispatch(SetMessage('Cập nhật thông tin thành công', TITLE.SUCCESSFUL));
    })
    .catch(e => {
      dispatch(SetMessage(e.message, 'LỖI'));
    })
    .finally(() => {
      dispatch(FetchDone());
    });
};
export const logout = his => dispatch => {
  dispatch(FetchDoing());
  dispatch(FetchDone());
  dispatch(ResetInfoUser());
  dispatch(ResetUser());
  dispatch(ResetFieldCanUpdate());
  his.push('/login');
  // return fetch(`${serverHost}/user/logout`)
  //   .then(res => {
  //     return res.json();
  //   })
  //   .then(res => {
  //     const result = JSON.parse(res);
  //     if (result.code === 1) {
  //       dispatch(FetchDone());
  //       dispatch(ResetInfoUser());
  //       his.push('/login');
  //     }
  //   })
  //   .catch(e => {
  //     dispatch(SetMessage(e.message, 'LỖI'));
  //   })
  //   .finally(() => {
  //     dispatch(FetchDone());
  //   });
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

export const login = (username, password, role) => dispatch => {
  dispatch(FetchDoing());
  console.log('login....', username, password);
  const url = `${serverHost}/user/login`;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ username, password, role }),
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

export const register = (
  username,
  password,
  repassword,
  islogin
) => dispatch => {
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
      if (islogin) {
        dispatch(login(username, password));

        dispatch(updateInfoUser());
        return;
      }
      const result = JSON.parse(res);
      if (result.code === 1) {
        dispatch(SetMessage(result.message, TITLE.SUCCESSFUL));
        dispatch(SetUrlBack('/login'));
      } else dispatch(SetMessage(result.message, TITLE.FAILED));
    })
    .catch(e => {
      dispatch(SetMessage(e.message, TITLE.ERROR));
    })
    .finally(() => {
      dispatch(FetchDone());
    });
};
export const facelogin = user => dispatch => {
  const { username, password } = user;
  dispatch(UpdateInfoUser(user));
  dispatch(register(username, password, password, true));

  //
  // dispatch(updateInfoUser(false));
};
