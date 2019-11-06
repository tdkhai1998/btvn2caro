import TYPE from './type';

export default (state = { value: null }, action) => {
  switch (action.type) {
    case TYPE.SET: {
      return { value: action.message, title: action.title };
    }
    case TYPE.RESET:
      return { value: null };
    case TYPE.SET_REQ:
      console.log(action);
      return { value: action.message, title: action.title, id: action.id };
    default:
      return state;
  }
};
