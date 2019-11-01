import TYPE from './type';

export default (state = null, action) => {
  switch (action.type) {
    case TYPE.SET: {
      console.log(TYPE.SET, action.url);
      return action.url;
    }
    case TYPE.RESET: {
      console.log(TYPE.RESET);
      return null;
    }
    default:
      return state;
  }
};
