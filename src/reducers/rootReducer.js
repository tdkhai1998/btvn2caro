import { combineReducers } from 'redux';
import {
  squares,
  turn,
  winnerLine,
  isSorted,
  history,
  isFetching,
  login,
  user
} from './subRecuders';

const rootReducer = combineReducers({
  squares,
  turn,
  winnerLine,
  isSorted,
  history,
  isFetching,
  login,
  user
});

export default rootReducer;
