import TYPE from './type';

export const ShowModal = () => ({
  type: TYPE.SET,
  showModal: true
});
export const HideModal = () => ({
  type: TYPE.SET,
  showModal: false
});
