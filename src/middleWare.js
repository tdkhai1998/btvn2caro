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
  RemoveWinnerLine
} from './Redux';

export default store => next => action => {
  if (action.type === Type.ADD) {
    const { squares, winnerLine } = store.getState();
    if (squares[action.index] === null && winnerLine.dir === -1) {
      store.dispatch(ChangeTurn());
      squares[action.index] = { value: action.turn ? 'X' : 'O', dirMark: -1 };
      const result = haveWinner(squares, action.index);
      if (result !== false) {
        store.dispatch(AddWinnerLine(result));
      }
      store.dispatch(AddToHistory(action.index, action.turn));
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
    next(action);
  } else {
    next(action);
  }
};
