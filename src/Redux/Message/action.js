import TYPE from './type';

export const SetMessage = (message, title) => ({
  type: TYPE.SET,
  message,
  title
});
export const ResetMessage = () => ({ type: TYPE.RESET });
export const SetRequest = (message, title, id) => ({
  type: TYPE.SET_REQ,
  message,
  title,
  id
});
