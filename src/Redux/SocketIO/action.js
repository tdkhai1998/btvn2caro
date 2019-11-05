import TYPE from './type';

export const StartSocketIO = () => ({
  type: TYPE.START
});
export const UpdateSocketIO = value => ({
  type: TYPE.UPDATE,
  value
});
export const EndSocketIO = () => ({
  type: TYPE.RESET
});
