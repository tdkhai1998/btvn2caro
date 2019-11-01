import TYPE from './type';

export default (state = { value: null }, action) => {
  switch (action.type) {
    case TYPE.SET: {
      console.log('set_mess', action.message, action.title);
      return { value: action.message, title: action.title };
    }
    case TYPE.RESET:
      console.log('reset_mess');
      return { value: null };
    default:
      return state;
  }
};
