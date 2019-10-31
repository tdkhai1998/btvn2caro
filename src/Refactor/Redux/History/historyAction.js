export const TYPE = {
  ADD: 'history_add',
  CHANGE_INDEX: 'history_change_index',
  RESET: 'history_reset',
  REMOVE: 'history_remove'
};
export const addToHis = (index, turn) => ({
  type: TYPE.ADD,
  index,
  turn
});
export const ChangeIndexHistory = index => ({
  type: TYPE.CHANGE_INDEX,
  index
});
export const ReSetHistory = () => ({
  type: TYPE.RESET
});
export const RemoveHistory = (from, to) => ({
  type: TYPE.REMOVE,
  from,
  to
});
