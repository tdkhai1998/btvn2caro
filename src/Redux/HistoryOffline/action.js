import TYPE from './type';

export const UpdateToHistoryOffline = value => ({
  type: TYPE.UPDATE,
  value
});
export const ReSetHistoryOffline = () => ({
  type: TYPE.RESET
});
