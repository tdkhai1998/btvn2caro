import TYPE from './type';

export const UpdateInfoUser = user => ({
  type: TYPE.UPDATE,
  user
});
export const ResetInfoUser = () => ({ type: TYPE.RESET });
