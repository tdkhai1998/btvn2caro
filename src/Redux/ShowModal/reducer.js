import TYPE from './type';

const showModal = (state = false, action) => {
  switch (action.type) {
    case TYPE.SET:
      console.log('set_modal ', action.showModal);
      return action.showModal;
    default:
      return state;
  }
};
export default showModal;
