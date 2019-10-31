export const TYPE = {
  ADD: 'user_add',
  RESET: 'reset_add'
};

export const AddUser = (user, token) => ({
  type: TYPE.ADD,
  user,
  token
});

export const ResetUser = () => ({
  type: TYPE.RESET
});
