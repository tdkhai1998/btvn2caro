import * as actions from '../Redux';
import { LeaveRoom } from './action';

const RejectUndo = () => (run, state) => {
  const { socketIO } = state();
  socketIO.socket.emit('reject', socketIO.room);
  run(actions.SetMessage('Tiếp tục nhé', ':)'));
};

export const RejectLose = () => (run, state) => {
  const { socketIO } = state();
  socketIO.socket.emit('reject', socketIO.room);
  run(actions.SetMessage('Tiếp tục nhé', ':)'));
};
export const RejectTie = () => (run, state) => {
  const { socketIO } = state();
  socketIO.socket.emit('reject', socketIO.room);
  run(actions.SetMessage('Tiếp tục nhé', ':)'));
};
export const RejectStart = () => run => {
  run(LeaveRoom());
};
export const RejectRequest = () => (run, state) => {
  const { message } = state();
  switch (message.id) {
    case 1:
      run(RejectUndo());
      break;
    case 2:
      run(RejectLose());
      break;
    case 3:
      run(RejectTie());
      break;
    case 4:
      run(RejectStart());
      break;
    default:
  }
};
