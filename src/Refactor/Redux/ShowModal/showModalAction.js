export const TYPE = {
  SET: 'modal_set'
};

export const showModal = () => ({
  type: TYPE.SET,
  showModal: true
});
export const hideModal = () => ({
  type: TYPE.SET,
  showModal: false
});
