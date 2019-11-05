import TYPE from './type';

export const AddToHistory = (index, turn) => ({
  type: TYPE.ADD,
  index,
  turn
});
export const ChangeIndexHistory = index => ({
  type: TYPE.CHANGE_INDEX,
  index
});
export const CutHistory = () => ({
  type: TYPE.CUT
});
export const ReSetHistory = () => ({
  type: TYPE.RESET
});
export const RemoveHistory = (from, to) => ({
  type: TYPE.REMOVE,
  from,
  to
});
export const UpdateHistory = value => ({
  type: TYPE.UPDATE,
  value
});
