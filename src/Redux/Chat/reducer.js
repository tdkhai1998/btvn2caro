import TYPE from './type';

const initial = {
  name: null,
  newMessage: null,
  profileAvatar: null
};

export default (state = initial, action) => {
  switch (action.type) {
    case TYPE.UPDATE: {
      console.log('update chat', { ...state, ...action.fields });
      return { ...state, ...action.fields };
    }
    case TYPE.RESET: {
      console.log('reset chat');
      return initial;
    }
    default:
      return state;
  }
};
