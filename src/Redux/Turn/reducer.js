import TYPE from './type';

export default function turn(state = false, action) {
  switch (action.type) {
    case TYPE.CHANGE: {
      return !state;
    }
    case TYPE.SET: {
      return action.turn;
    }
    default:
      return state;
  }
}
