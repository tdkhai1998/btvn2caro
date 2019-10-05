import * as types from './constants/ActionTypes';
import {
  changeTurn,
  winner,
  addToHis,
  changeBoardFromHis,
  setTurn, ChangeHisIndex
} from './actions/allActions';
import haveWinner from './helper';

export default store => next => action => {
  if (action.type === types.SQUARES.ADD) {
    const { squares, winnerLine } = store.getState();
    if (squares[action.index] === null && winnerLine.dir === -1) {
      store.dispatch(changeTurn());
      squares[action.index] = { value: action.turn ? 'X' : 'O', dirMark: -1 };
      const result = haveWinner(squares, action.index);
      if (result !== false) {
        store.dispatch(winner(result));
      }
      store.dispatch(addToHis(action.index, action.turn));
      next(action);
    }
  } else if (action.type === types.HISTORY.REMOVE) {
    console.log('Historry removw');
    const { from, to } = action;
    const { history } = store.getState();
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
    store.dispatch(changeBoardFromHis(change.arr, change.isRemove));
    store.dispatch(setTurn(history.arr[to].turn));
    store.dispatch(ChangeHisIndex(to))
    next(action);
  } else {
    next(action);
  }
};
