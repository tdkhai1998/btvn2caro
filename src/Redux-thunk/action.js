import * as actions from '../Redux';
import { TypeGameMode } from '../Redux/GameMode';

export const sendChatMess = mess => (run, state) => {
  const { socketIO } = state();
  const { socket, room } = socketIO;
  socket.emit('chat', room, mess);
};

export const ChangeModeGame = () => (run, getState) => {
  const state = getState();
  const { gameMode, history, historyOnline, historyOffline, turn } = state;
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
  } else {
    run(actions.ResetMessage());
  }
};

export const RequestLose = () => (run, state) => {
  const { socketIO } = state();
  run(actions.FetchDoing());
  if (socketIO.socket) {
    run(actions.SetRequest(null, 'REQUEST', 2));
    socketIO.socket.emit('request', 2, socketIO.room);
  }
};

export const RequestTie = () => (run, state) => {
  const { socketIO } = state();
  run(actions.FetchDoing());
  if (socketIO.socket) {
    run(actions.SetRequest(null, 'REQUEST', 3));
    socketIO.socket.emit('request', 3, socketIO.room);
  }
};

export const RequestUndo = () => (run, state) => {
  const { socketIO, gameMode, turn } = state();
  const { socket, room } = socketIO;
  const codeReq = 1;
  const numOfUndo = gameMode.yourTurn === turn ? 2 : 1;
  run(
    actions.UpdateGameMode({
      sender: true,
      undo: numOfUndo
    })
  );
  socket.emit('request', codeReq, room, numOfUndo);
  run(actions.SetRequest(null, 'REQUEST', 1));
  run(actions.FetchDoing());
};
