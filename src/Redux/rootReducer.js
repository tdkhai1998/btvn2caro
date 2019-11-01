import { combineReducers } from 'redux';

import { history } from './History';
import { infoUser } from './InfoUser';
import { isFetching } from './IsFetching';
import { isSorted } from './IsSorted';
import { message } from './Message';
import { showModal } from './ShowModal';
import { squares } from './Squares';
import { turn } from './Turn';
import { user } from './User';
import { winnerLine } from './WinnerLine';
import { urlBack } from './UrlBack';

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
  winnerLine,
  urlBack
});

export default rootReducer;
