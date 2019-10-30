import { TYPE } from './winnerLineAction';

const winnerLine = (state = { arr: [], dir: -1 }, action) => {
  switch (action.type) {
    case TYPE.ADD: {
      return action.arr;
    }
    case TYPE.REMOVE:
      return { arr: [], dir: -1 };
    default:
      return state;
  }
};
export default winnerLine;
