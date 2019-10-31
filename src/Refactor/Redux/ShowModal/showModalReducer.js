import { TYPE } from './showModalAction';

const showModal = (state = false, action) => {
  switch (action.type) {
    case TYPE.SET:
      return action.showModal;
    default:
      return state;
  }
};
export default showModal;
