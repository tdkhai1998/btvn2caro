import TYPE from './type';

export const UpdateChatStatus = fields => ({
  type: TYPE.UPDATE,
  fields
});
export const ReSetChatStatus = fields => ({
  type: TYPE.RESET,
  fields
});
