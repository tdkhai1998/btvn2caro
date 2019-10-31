export const TYPE = {
  ADD: 'squares_set',
  CHANGE: 'squares_change',
  REMOVE: 'squares_remove',
  RESET: 'squares_reset'
};

export const AddOneToBoad = (index, turn) => ({
  type: TYPE.ADD,
  index,
  turn
});
export const RemoveFromBoard = index => ({
  type: TYPE.REMOVE,
  index
});
export const ResetBoard = () => ({
  type: TYPE.RESET
});
export const ChangeBoardFromHis = (arr, isRemove) => ({
  type: TYPE.CHANGE,
  arr,
  isRemove
});
