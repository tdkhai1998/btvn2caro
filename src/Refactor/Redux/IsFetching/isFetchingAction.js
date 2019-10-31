import { TYPE } from './isFetchingReducer';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case TYPE.SET: {
      return action.value;
    }
    default:
      return state;
  }
};

export default isFetching;
