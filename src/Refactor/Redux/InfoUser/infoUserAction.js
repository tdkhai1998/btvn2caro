export const TYPE = {
  RESET: 'infoUser_reset',
  UPDATE: 'infoUser_update'
};
export const UpdateInfoUser = user => ({
  type: TYPE.UPDATE,
  user
});
export const ResetInfoUser = () => ({ type: TYPE.RESET });
