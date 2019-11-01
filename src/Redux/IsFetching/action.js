import TYPE from './type';

export const FetchDoing = () => ({
  type: TYPE.SET,
  value: true
});
export const FetchDone = () => ({
  type: TYPE.SET,
  value: false
});
