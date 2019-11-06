import Type from './Redux/Squares/type';
import TypeHis from './Redux/History/type';
import haveWinner from './helper';
import * as actions from './Redux';
import robot from './robot';
import TypeGameMode from './Redux/GameMode/type';

export default store => next => action => {
  if (action.type === Type.ADD) {
    const { squares, winnerLine, gameMode, socketIO } = store.getState();
    if (squares[action.index] === null && winnerLine.dir === -1) {
      store.dispatch(actions.ChangeTurn());
      squares[action.index] = { value: action.turn ? 'X' : 'O', dirMark: -1 };
      const result = haveWinner(squares, action.index);
      if (result !== false) {
        store.dispatch(actions.AddWinnerLine(result));
        if (actions.turn !== gameMode.yourTurn) {
          store.dispatch(
            actions.SetMessage('BẠN LÀ NGƯỜI CHIẾN THẮNG', 'WINNER')
          );
        } else {
          store.dispatch(
            actions.SetMessage('ĐỐI THỦ LÀ NGƯỜI NGƯỜI CHIẾN THẮNG', 'WINNER')
          );
        }
      }
      store.dispatch(actions.AddToHistory(action.index, action.turn));
      if (gameMode.mode === TypeGameMode.modeType.Online) {
        socketIO.socket.emit('play', action.index, socketIO.room);
      }
      if (
        gameMode.mode === TypeGameMode.modeType.Offline &&
        action.turn === gameMode.yourTurn
      ) {
        store.dispatch(actions.AddOneToBoad(robot(squares, action.index), 'O'));
      }
      next(action);
    }
  } else if (action.type === TypeHis.REMOVE) {
    const { from, to } = action;
    let { history } = store.getState();
    const change =
      from > to
        ? {
            arr: history.arr.slice(to + 1, from + 1),
            isRemove: true
          }
        : {
            arr: history.arr.slice(from, to + 1),
            isRemove: false
          };
    store.dispatch(actions.ChangeBoardFromHis(change.arr, change.isRemove));
    store.dispatch(actions.ChangeIndexHistory(to));
    history = store.getState().history;
    store.dispatch(actions.SetTurn(!history.arr[to].turn));
    store.dispatch(actions.RemoveWinnerLine());
    const { squares } = store.getState();
    if (!change.isRemove) {
      const result = haveWinner(squares, history.arr[to].index);
      if (result !== false) {
        store.dispatch(actions.AddWinnerLine(result));
      }
    }
    next(action);
  } else {
    next(action);
  }
};
