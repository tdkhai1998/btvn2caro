import io from 'socket.io-client';
import TYPE from './type';
import serverHost from '../../Config';

export default (state = { socket: null }, action) => {
  switch (action.type) {
    case TYPE.START: {
      const socket = io(serverHost);
      return { socket };
    }
    case TYPE.UPDATE: {
      return { ...state, ...action.value };
    }
    case TYPE.RESET:
      return { socket: null };
    default:
      return state;
  }
};
