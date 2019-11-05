import TYPE from './type';

export const UpdateToHistoryOnline = value => ({
  type: TYPE.UPDATE,
  value
});
export const ReSetHistoryOnline = () => ({
  type: TYPE.RESET
});
