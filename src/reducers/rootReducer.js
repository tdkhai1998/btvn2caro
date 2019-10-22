import { combineReducers } from 'redux';
import {
  squares,
  turn,
  winnerLine,
  isSorted,
  history,
  isFetching
} from './subRecuders';

const rootReducer = combineReducers({
  squares,
  turn,
  winnerLine,
  isSorted,
  history,
  isFetching
});

export default rootReducer;
