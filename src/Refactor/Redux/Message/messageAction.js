export const TYPE = {
  SET: 'message_set',
  RESET: 'message_reset'
};

export const SetMessage = (message, title) => ({
  type: TYPE.SET,
  message,
  title
});
export const ResetMessage = () => ({ type: TYPE.RESET });
