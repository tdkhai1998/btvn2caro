import io from 'socket.io-client';
import TYPE from './type';
import serverHost from '../../Config';

export default (state = { socket: null, room: -1 }, action) => {
  switch (action.type) {
    case TYPE.SET: {
      const socket = io(serverHost);
      return { socket, room: -1 };
    }
    case TYPE.SETROOM: {
      return { ...state, room: action.room };
    }
    case TYPE.RESET:
      return null;
    default:
      return state;
  }
};
