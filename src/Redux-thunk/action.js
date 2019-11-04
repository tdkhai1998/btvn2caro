import * as actions from '../Redux';

export const RequestUndo = () => (run, state) => {
  const { socketIO, gameMode, turn } = state();
  const { socket, room } = socketIO;
  run(
    actions.UpdateGameMode({
      sender: true,
      undo: gameMode.yourTurn === turn ? 2 : 1
    })
  );
  console.log('..........................');
  socket.emit('request-Undo', room, gameMode.yourTurn === turn ? 2 : 1);
  run(actions.FetchDoing());
};
export const AcceptRequestUndo = () => (run, state) => {
  const { turn, gameMode, history, socketIO } = state();
  if (!gameMode.sender) socketIO.socket.emit('accept-request', socketIO.room);
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
  run(actions.ResetMessage());
};

export const sendChatMess = mess => (run, state) => {
  const { socketIO } = state();
  const { socket, room } = socketIO;
  socket.emit('chat', room, mess);
};
