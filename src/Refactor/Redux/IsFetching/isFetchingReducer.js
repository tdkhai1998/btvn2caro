export const TYPE = {
  SET: 'isFetching_set'
};

export const FetchDoing = () => ({
  type: TYPE.SET,
  value: true
});
export const FetchDone = () => ({
  type: TYPE.SET,
  value: false
});
