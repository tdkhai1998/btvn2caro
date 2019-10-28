import { combineReducers } from 'redux';
import {
  squares,
  turn,
  winnerLine,
  isSorted,
  history,
  isFetching,
  login,
  user,
  haveMessage
} from './subRecuders';

const rootReducer = combineReducers({
  squares,
  turn,
  winnerLine,
  isSorted,
  history,
  isFetching,
  login,
  user,
  haveMessage
});

export default rootReducer;
