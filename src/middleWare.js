import Type from './Redux/Squares/type';
import TypeHis from './Redux/History/type';
import haveWinner from './helper';
import {
  ChangeTurn,
  AddWinnerLine,
  AddToHistory,
  ChangeBoardFromHis,
  ChangeIndexHistory,
  SetTurn,
  RemoveWinnerLine,
  AddOneToBoad,
  TypeGameMode,
  SetMessage
} from './Redux';
import robot from './robot';

export default store => next => action => {
  if (action.type === Type.ADD) {
    const { squares, winnerLine, gameMode } = store.getState();

    if (squares[action.index] === null && winnerLine.dir === -1) {
      store.dispatch(ChangeTurn());
      squares[action.index] = { value: action.turn ? 'X' : 'O', dirMark: -1 };
      const result = haveWinner(squares, action.index);
      if (result !== false) {
        store.dispatch(AddWinnerLine(result));
        if (action.turn === gameMode.yourTurn) {
          store.dispatch(SetMessage('BẠN LÀ NGƯỜI CHIẾN THẮNG', 'WINNER'));
        } else {
          store.dispatch(
            SetMessage('ĐỐI THỦ LÀ NGƯỜI NGƯỜI CHIẾN THẮNG', 'WINNER')
          );
        }

        // if (gameMode.mode === TypeGameMode.modeType.Online && socketIO.socket)
        //   socketIO.socket.emit('winner', action.turn, socketIO.room);
        // else {
        //   console.log('sfvfshghvb');
        // }
      }
      store.dispatch(AddToHistory(action.index, action.turn));
      if (
        gameMode.mode === TypeGameMode.modeType.Offline &&
        action.turn === gameMode.yourTurn
      ) {
        store.dispatch(AddOneToBoad(robot(squares, action.index), 'O'));
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
    store.dispatch(ChangeBoardFromHis(change.arr, change.isRemove));
    store.dispatch(ChangeIndexHistory(to));
    history = store.getState().history;
    store.dispatch(SetTurn(!history.arr[to].turn));
    store.dispatch(RemoveWinnerLine());
    const { squares } = store.getState();
    if (!change.isRemove) {
      console.log(squares);
      console.log(history.arr, to, history.arr[to].index);
      const result = haveWinner(squares, history.arr[to].index);
      if (result !== false) {
        store.dispatch(AddWinnerLine(result));
      }
    }
    next(action);
  } else {
    next(action);
  }
};
