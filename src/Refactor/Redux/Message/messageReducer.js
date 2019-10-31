import { TYPE } from './messageAction';

const message = (state = { value: null }, action) => {
  switch (action.type) {
    case TYPE.SET: {
      return { value: action.message, title: action.title };
    }
    case TYPE.RESET:
      return { value: null };
    default:
      return state;
  }
};
export default message;
