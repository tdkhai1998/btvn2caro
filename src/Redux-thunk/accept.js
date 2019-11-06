import * as actions from '../Redux';

export const restart = dispatch => {
  dispatch(actions.ResetBoard());
  dispatch(actions.SetTurn(false));
  dispatch(actions.RemoveWinnerLine());
  dispatch(actions.ReSetHistory());
};
const AcceptLose = () => (run, state) => {
  const { socketIO } = state();
  socketIO.socket.emit('accept-request', socketIO.room);
  run(actions.ResetMessage());
  run(actions.SetMessage('Restart lại nha!!!!'));
  restart(run);
};

const AcceptTie = () => (run, state) => {
  const { socketIO } = state();
  socketIO.socket.emit('accept-request', socketIO.room);
  run(actions.ResetMessage());
  run(actions.SetMessage('Restart lại nha!!!!'));
  restart(run);
};

const AcceptStart = () => run => {
  run(actions.ResetMessage());
  restart(run);
};

export const AcceptUndo = () => (run, state) => {
  const { gameMode, history, socketIO } = state();
  if (!gameMode.sender) socketIO.socket.emit('accept-request', socketIO.room); // neu la nguoi duoc yeu cau thi trả lòi
  run(actions.ResetMessage());
  if (gameMode.undo === 1) {
    if (history.index - 1 >= 0) {
      run(actions.RemoveHistory(history.index, history.index - 1));
    }
  } else if (history.index - 2 >= 0) {
    run(actions.RemoveHistory(history.index, history.index - 2));
  }
  run(actions.UpdateGameMode({ sender: null, undo: null }));
  run(actions.FetchDone());
};

export const AcceptRequest = () => (run, state) => {
  const { message } = state();
  switch (message.id) {
    case 1:
      run(AcceptUndo());
      break;
    case 2:
      run(AcceptLose());
      break;
    case 3:
      run(AcceptTie());
      break;
    case 4:
      run(AcceptStart());
      break;
    default:
  }
};
