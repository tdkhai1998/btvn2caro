import TYPE from './type';

const initial = {
  name: null,
  newMessage: null,
  profileAvatar: null
};

export default (state = initial, action) => {
  switch (action.type) {
    case TYPE.UPDATE: {
      return { ...state, ...action.fields };
    }
    case TYPE.RESET: {
      return initial;
    }
    default:
      return state;
  }
};
