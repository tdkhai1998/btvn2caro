import TYPE from './type';

export const UpdateFields = fields => ({
  type: TYPE.UPDATE,
  fields
});
export const ResetFieldCanUpdate = () => ({
  type: TYPE.RESET
});
