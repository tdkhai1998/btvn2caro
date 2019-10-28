import { combineReducers } from 'redux';
import * as subRecuders from './subRecuders';

const rootReducer = combineReducers({
  ...subRecuders
});

export default rootReducer;
