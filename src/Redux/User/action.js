import TYPE from './type';

export const AddUser = (user, token) => ({
  type: TYPE.ADD,
  user,
  token
});

export const ResetUser = () => ({
  type: TYPE.RESET
});
