import TYPE from './type';

export const ResetGameMode = () => ({
  type: TYPE.RESET
});
export const UpdateGameMode = s => ({
  type: TYPE.UPDATE,
  s
});
