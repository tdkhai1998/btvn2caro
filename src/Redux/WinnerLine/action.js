import TYPE from './type';

export const AddWinnerLine = arr => ({
  type: TYPE.ADD,
  arr
});
export const RemoveWinnerLine = () => ({
  type: TYPE.REMOVE
});
