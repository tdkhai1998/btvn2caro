import fetch, { Headers } from 'node-fetch';
import { addResponseMessage } from 'react-chat-widget';
import * as action from '../Redux';
import { TypeGameMode } from '../Redux/GameMode';
import { ChangeModeGame, LeaveRoom } from './action';

import { BeAccepted } from './beAccepted';
import { HaveRequest } from './haveRequest';
import { BeRejected } from './beRejected';

const config = require('../Config');

const serverHost = config.default;

const TITLE = {
  SUCCESSFUL: 'THÀNH CÔNG',
  FAILED: 'THẤT BẠI',
  ERROR: 'LỖI'
};
const FieldsCanUpdate = (username, dispatch) => {
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
  dispatch(action.UpdateFields(fields));
};
export const loadInfo = () => (dispatch, getState) => {
  dispatch(action.FetchDoing());
  const { user } = getState();
  if (!user) {
    return dispatch(action.FetchDone());
  }
  return fetch(`${serverHost}/me`, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'text/plain'
    })
  })
    .then(res => {
      return res.json();
    })
    .then(res => {
      const result = JSON.parse(res);
      if (result.code === 1) {
        result.data.fetched = true;
        FieldsCanUpdate(user.user, dispatch);
        result.data.gioitinh = result.data.gioitinh === 0;
        dispatch(action.UpdateInfoUser(result.data));
      } else {
        dispatch(action.UpdateInfoUser({ fetched: true }));
        dispatch(action.SetMessage(result.error, 'THẤT BẠI'));
      }
    })
    .catch(e => {
      dispatch(action.SetMessage(e.message, 'LỖI'));
    })
    .finally(() => {
      dispatch(action.UpdateInfoUser({ fetched: true }));
      dispatch(action.FetchDone());
    });
};

export const updateInfoUser = mess => (dispatch, getState) => {
  dispatch(action.FetchDoing());
  const { infoUser } = getState();
  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain'
  });
  // infoUser.avatar = null;\
  const url = `${serverHost}/user`;
  const options = {
    method: 'PUT',
    body: JSON.stringify(infoUser),
    headers
  };
  return fetch(url, options)
    .then(() => {
      if (!mess) {
        dispatch(
          action.SetMessage('Cập nhật thông tin thành công', TITLE.SUCCESSFUL)
        );
      }
    })
    .catch(e => {
      if (!mess) dispatch(action.SetMessage(e.message, 'LỖI'));
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
      'Content-Type': 'text/plain'
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

export const login = (username, password) => dispatch => {
  dispatch(action.FetchDoing());
  const url = `${serverHost}/user/login`;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'text/plain' }
  })
    .then(res => res.json())
    .then(res => {
      const result = JSON.parse(res);
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

export const register = (username, password, repassword, is) => dispatch => {
  dispatch(action.FetchDoing());
  const u = new FormData();
  u.append('s', 'd');
  return fetch(`${serverHost}/user/register`, {
    method: 'POST',
    body: JSON.stringify({ username, password, repassword }),
    headers: { 'Content-Type': 'text/plain' }
  })
    .then(r => r.json())
    .then(res => {
      if (is) {
        dispatch(login(username, password));
        dispatch(updateInfoUser(true));
        return;
      }
      const result = JSON.parse(res);
      if (result.code === 1) {
        dispatch(action.SetMessage('Đăng ký thành công', TITLE.SUCCESSFUL));
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
};

export const serveSocket = () => (dispatch, getState) => {
  let socket = null;
  let yourTurn;
  dispatch(action.FetchDoing());
  dispatch(action.StartSocketIO());
  while (!socket) {
    const IO = getState().socketIO;
    socket = IO.socket;
  }
  const state = getState();
  socket.emit('find', state.user.user);
  socket.on('YouAreAlone', () => {
    dispatch(LeaveRoom(true));
  });
  socket.on('get-room', (room, index) => {
    yourTurn = index === 1;
    dispatch(action.UpdateSocketIO({ room, yourTurn: index === 1 }));
    dispatch(action.UpdateGameMode({ yourTurn: index === 1 }));
  });
  socket.on('have-enough', id => {
    dispatch(action.UpdateGameMode({ mode: TypeGameMode.modeType.Online }));
    dispatch(ChangeModeGame());
    dispatch(action.FetchDone());
    dispatch(
      action.SetMessage(
        `Lượt của bạn là ${yourTurn ? 'X. Bạn chơi sau' : 'O. Bạn chơi trước'}`,
        'Ghép cặp thành công'
      )
    );
    const { infoUser } = getState();
    socket.emit('start-chat', id, infoUser.username, infoUser.avatar);
    socket.on('start-chat', (name, avt) => {
      dispatch(action.UpdateChatStatus({ name, profileAvatar: avt }));
    });
  });
  socket.on('play', value => {
    dispatch(action.AddOneToBoad(value, !yourTurn));
  });

  socket.on('accept-request', () => {
    BeAccepted(dispatch, getState);
  });

  socket.on('chat', mess => {
    addResponseMessage(mess);
    dispatch(action.UpdateChatStatus({ newMessage: mess }));
  });

  socket.on('beRejected', () => {
    BeRejected(dispatch, getState);
  });

  socket.on('haveRequest', (reqCode, ...rest) => {
    HaveRequest(reqCode, rest, dispatch, state);
  });
};

export * from './action';
export * from './accept';
export * from './beAccepted';
export * from './reject';
export * from './beRejected';
