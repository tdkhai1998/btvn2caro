import { combineReducers } from 'redux';
import { squares, turn, winnerLine, isSorted, history } from './subRecuders';

const rootReducer = combineReducers({
  squares,
  turn,
  winnerLine,
  isSorted,
  history
});

export default rootReducer;
