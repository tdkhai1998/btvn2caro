import { TYPE } from './isSortedAction';

const isSorted = (state = false, action) => {
  switch (action.type) {
    case TYPE.CHANGE: {
      return !state;
    }
    default:
      return state;
  }
};

export default isSorted;
