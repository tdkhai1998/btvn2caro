import { combineReducers } from 'redux';
import history from './History/historyReducer';
import infoUser from './InfoUser/infoUserReducer';
import isFetching from './IsFetching/isFetchingReducer';
import isSorted from './IsSorted/isSortedRecuder';
import message from './Message/messageReducer';
import showModal from './ShowModal/showModalReducer';
import squares from './Squares/squaresReducer';
import turn from './Turn/turnReducer';
import user from './User/userReducer';
import winnerLine from './WinnerLine/winnerLineRecuder';

const rootReducer = combineReducers({
  history,
  infoUser,
  isFetching,
  isSorted,
  message,
  showModal,
  squares,
  turn,
  user,
  winnerLine
});

export default rootReducer;
