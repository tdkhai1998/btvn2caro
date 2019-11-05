import TYPE from './type';

export default (state = { arr: [], index: -1, turn: false }, action) => {
  switch (action.type) {
    case TYPE.UPDATE: {
      return { ...state, ...action.value };
    }
    case TYPE.RESET: {
      return { arr: [], index: -1, turn: false };
    }
    default:
      return state;
  }
};
