import TYPE from './type';

export const ChangeTurn = () => ({
  type: TYPE.CHANGE
});
export const ResetTurn = () => ({
  type: TYPE.RESET
});
export const SetTurn = turn => ({
  type: TYPE.SET,
  turn
});
