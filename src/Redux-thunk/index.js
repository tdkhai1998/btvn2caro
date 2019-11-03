import fetch, { Headers } from 'node-fetch';
import * as action from '../Redux';
import { TypeGameMode } from '../Redux/GameMode';

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
  dispatch(action.UpdateFields(fields));
};
export const loadInfo = () => (dispatch, getState) => {
  dispatch(action.FetchDoing());
  console.log('LoadInfo ....');
  const { user } = getState();
  console.log(user);
  if (!user) {
    dispatch(action.FetchDone());
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
          dispatch(action.UpdateInfoUser(result.data));
        } else {
          dispatch(action.UpdateInfoUser({ fetched: true }));
          dispatch(action.SetMessage(result.error, 'THẤT BẠI'));
        }
      })
      .catch(e => {
        console.log('Loadinfoerr', e.message);

        dispatch(action.SetMessage(e.message, 'LỖI'));
      })
      .finally(() => {
        dispatch(action.UpdateInfoUser({ fetched: true }));
        dispatch(action.FetchDone());
      });
  }
};

export const updateInfoUser = () => (dispatch, getState) => {
  dispatch(action.FetchDoing());
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
      dispatch(
        action.SetMessage('Cập nhật thông tin thành công', TITLE.SUCCESSFUL)
      );
    })
    .catch(e => {
      dispatch(action.SetMessage(e.message, 'LỖI'));
    })
    .finally(() => {
      dispatch(action.FetchDone());
    });
};
export const logout = his => dispatch => {
  dispatch(action.FetchDoing());
  dispatch(action.FetchDone());
  dispatch(action.ResetInfoUser());
  dispatch(action.ResetUser());
  dispatch(action.ResetFieldCanUpdate());
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
  dispatch(action.FetchDoing());
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
        dispatch(action.HideModal());
        dispatch(
          action.SetMessage('Cập nhật password thành công', 'Thành Công')
        );
      } else {
        dispatch(
          action.SetMessage(
            `Cập nhật password không thành công  ${result.message}`,
            'Thất bại'
          )
        );
      }
    })
    .catch(e => {
      dispatch(action.SetMessage(e.message, 'LỖI'));
    })
    .finally(() => {
      dispatch(action.FetchDone());
    });
};

export const login = (username, password, role) => dispatch => {
  dispatch(action.FetchDoing());
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
        dispatch(action.AddUser(result.user, result.token));
        dispatch(action.SetMessage('Đăng nhập thành công', 'THÀNH CÔNG'));
        dispatch(action.SetUrlBack('/home'));
      } else {
        dispatch(action.SetMessage('Đăng nhập không thành công', 'THẤT BẠI'));
      }
    })
    .catch(e => {
      dispatch(action.SetMessage(e.message, 'LỖI'));
    })
    .finally(() => {
      dispatch(action.FetchDone());
    });
};

export const register = (
  username,
  password,
  repassword,
  islogin
) => dispatch => {
  dispatch(action.FetchDoing());
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
        dispatch(action.SetMessage(result.message, TITLE.SUCCESSFUL));
        dispatch(action.SetUrlBack('/login'));
      } else dispatch(action.SetMessage(result.message, TITLE.FAILED));
    })
    .catch(e => {
      dispatch(action.SetMessage(e.message, TITLE.ERROR));
    })
    .finally(() => {
      dispatch(action.FetchDone());
    });
};
export const facelogin = user => dispatch => {
  const { username, password } = user;
  dispatch(action.UpdateInfoUser(user));
  dispatch(register(username, password, password, true));

  //
  // dispatch(updateInfoUser(false));
};

export const serveSocket = () => (dispatch, getState) => {
  let socket = null;
  let yourTurn;
  dispatch(action.FetchDoing());
  dispatch(action.StartSocketIO());
  while (!socket) {
    socket = getState().socketIO.socket;
  }
  socket.on('get-room', (room, index) => {
    yourTurn = index === 1;
    dispatch(action.SetRoomSocket(room));
    dispatch(action.UpdateGameMode({ yourTurn: index === 1 }));
  });
  socket.on('have-enough', id => {
    dispatch(action.UpdateGameMode({ mode: TypeGameMode.modeType.Online }));
    dispatch(action.FetchDone());
    dispatch(
      action.UpdateGameMode({ mode: action.TypeGameMode.modeType.Online })
    );
    console.log('rủ rồi chơi thôi', id);
  });
  socket.on('play', value => {
    dispatch(action.AddOneToBoad(value, !yourTurn));
  });
};
