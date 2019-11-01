import TYPE from './type';

export default (state = null, action) => {
  switch (action.type) {
    case TYPE.ADD: {
      return {
        user: action.user,
        token: action.token
      };
    }
    case TYPE.RESET: {
      return null;
    }
    default:
      return state;
  }
};
