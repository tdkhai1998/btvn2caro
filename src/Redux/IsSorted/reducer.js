import TYPE from './type';

export default (state = false, action) => {
  switch (action.type) {
    case TYPE.CHANGE: {
      return !state;
    }
    default:
      return state;
  }
};
