import TYPE from './type';

export const SetMessage = (message, title) => ({
  type: TYPE.SET,
  message,
  title
});
export const ResetMessage = () => ({ type: TYPE.RESET });
