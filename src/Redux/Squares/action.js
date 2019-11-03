import TYPE from './type';

export const AddOneToBoad = (index, turn) => ({
  type: TYPE.ADD,
  index,
  turn
});
export const AddOneToBoadOnl = (index, turn) => ({
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
