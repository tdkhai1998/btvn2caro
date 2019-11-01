import TYPE from './type';

export default (state = false, action) => {
  switch (action.type) {
    case TYPE.SET: {
      return action.value;
    }
    default:
      return state;
  }
};
