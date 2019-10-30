export const TYPE = {
  ADD: 'winnerLine_add',
  REMOVE: 'winnerLine_remove'
};

export const AddWinnerLine = arr => ({
  type: TYPE.ADD,
  arr
});
export const RemoveWinnerLine = () => ({
  type: TYPE.REMOVE
});
