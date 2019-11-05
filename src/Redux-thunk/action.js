import * as actions from '../Redux';
import { TypeGameMode } from '../Redux/GameMode';

export const RequestUndo = () => (run, state) => {
  const { socketIO, gameMode, turn } = state();
  const { socket, room } = socketIO;
  run(
    actions.UpdateGameMode({
      sender: true,
      undo: gameMode.yourTurn === turn ? 2 : 1
    })
  );
  socket.emit('request-Undo', room, gameMode.yourTurn === turn ? 2 : 1);
  run(actions.FetchDoing());
};
export const AcceptRequestUndo = () => (run, state) => {
  const { gameMode, history, socketIO } = state();
  if (!gameMode.sender) socketIO.socket.emit('accept-request', socketIO.room); //neu la nguoi duoc yeu cau thi trả lòi
  run(actions.ResetMessage());
  const func1 = () => {
    if (history.index - 1 >= 0)
      run(actions.RemoveHistory(history.index, history.index - 1));
  };
  const func2 = () => {
    if (history.index - 2 >= 0)
      run(actions.RemoveHistory(history.index, history.index - 2));
  };
  if (gameMode.undo === 1) {
    func1();
  } else func2();
  run(actions.UpdateGameMode({ sender: null, undo: null }));
  run(actions.FetchDone());
};
export const RejectRequestUndo = () => (run, state) => {
  const { socketIO, gameMode } = state();
  if (socketIO.socket && !gameMode.sender) {
    socketIO.socket.emit('reject-Undo', socketIO.room);
    run(actions.ResetMessage());
  } else {
    run(actions.FetchDone());
    run(actions.SetMessage('Yêu cầu Undo không được chấp nhận', 'Thất bại'));
  }
};

export const sendChatMess = mess => (run, state) => {
  const { socketIO } = state();
  const { socket, room } = socketIO;
  socket.emit('chat', room, mess);
};

export const ChangeModeGame = () => (run, getState) => {
  const state = getState();
  const { gameMode, history, historyOnline, historyOffline, turn } = state;
  console.log('chuyen sang ', gameMode.mode);
  console.log(historyOnline, historyOffline, history, turn);

  run(actions.ResetBoard());
  if (gameMode.mode === TypeGameMode.modeType.Online) {
    run(actions.UpdateToHistoryOffline({ ...history, turn }));
    run(actions.UpdateHistory(historyOnline));
    run(actions.ChangeBoardFromHis(historyOnline.arr, false));
    run(actions.SetTurn(historyOnline.turn));
  } else {
    run(actions.UpdateToHistoryOnline({ ...history, turn }));
    run(actions.UpdateHistory(historyOffline));
    run(actions.ChangeBoardFromHis(historyOffline.arr, false));
    run(actions.SetTurn(historyOffline.turn));
  }
};

export const LeaveRoom = () => (run, state) => {
  const { socketIO } = state();
  if (socketIO.socket) {
    socketIO.socket.emit('leaveRoom', socketIO.room);
    run(actions.EndSocketIO());
    delete socketIO.socket;
    run(actions.SetMessage('Người chơi đã thoát khỏi phòng'));
  }
};
