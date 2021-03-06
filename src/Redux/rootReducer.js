import { combineReducers } from 'redux';

import { historyOffline } from './HistoryOffline';
import { historyOnline } from './HistoryOnline';
import { history } from './History';
import { infoUser } from './InfoUser';
import { fieldUpdate } from './FieldsUpdate';
import { isFetching } from './IsFetching';
import { isSorted } from './IsSorted';
import { message } from './Message';
import { showModal } from './ShowModal';
import { squares } from './Squares';
import { turn } from './Turn';
import { user } from './User';
import { winnerLine } from './WinnerLine';
import { urlBack } from './UrlBack';
import { gameMode } from './GameMode';
import { socketIO } from './SocketIO';
import { chat } from './Chat';

const rootReducer = combineReducers({
  historyOffline,
  historyOnline,
  history,
  chat,
  socketIO,
  gameMode,
  infoUser,
  fieldUpdate,
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
