export const TYPE = {
  SET: 'turn_set',
  CHANGE: 'turn_change'
};
export const changeTurn = () => ({
  type: TYPE.CHANGE
});
export const setTurn = turn => ({
  type: TYPE.SET,
  turn
});
