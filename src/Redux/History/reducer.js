import TYPE from './type';

export default (state = { arr: [], index: -1 }, action) => {
  const { arr, index } = state;
  switch (action.type) {
    case TYPE.ADD: {
      const newArr = arr.slice(0, index + 1);
      newArr.push({ index: action.index, turn: action.turn });
      return {
        arr: newArr,
        index: index + 1
      };
    }
    case TYPE.CUT: {
      const newArr = arr.slice(0, index + 1);
      return {
        arr: newArr,
        index
      };
    }
    case TYPE.CHANGE_INDEX: {
      return {
        arr,
        index: action.index
      };
    }
    case TYPE.RESET: {
      return { arr: [], index: -1 };
    }
    case TYPE.UPDATE:{
      return action.value
    }
    case TYPE.REMOVE:
    default:
      return state;
  }
};
