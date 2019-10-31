export const TYPE = {
  SET: 'turn_set',
  CHANGE: 'turn_change'
};
export const ChangeTurn = () => ({
  type: TYPE.CHANGE
});
export const SetTurn = turn => ({
  type: TYPE.SET,
  turn
});
