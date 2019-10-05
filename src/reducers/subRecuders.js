import * as types from '../constants/ActionTypes';

const initialState = Array(400).fill(null);

export const turn = (state = false, action) => {
  const TYPE = types.TURN;
  switch (action.type) {
    case TYPE.CHANGE: {
      return !state;
    }
    case TYPE.SET: {
      return action.turn;
    }
    default:
      return state;
  }
};
export const winnerLine = (state = { arr: [], dir: -1 }, action) => {
  const TYPE = types.WINNER_LINE;
  switch (action.type) {
    case TYPE.ADD: {
      return action.arr;
    }
    default:
      return state;
  }
};
export const squares = (state = initialState, action) => {
  switch (action.type) {
    case types.SQUARES.ADD: {
      const newState = state.slice();
      newState[action.index] = {
        value: action.turn ? 'X' : 'O',
        dirMark: -1
      };
      return newState;
    }
    case types.SQUARES.REMOVE: {
      const newState = state.slice();
      newState[action.index] = null;
      return newState;
    }
    case types.SQUARES.MANY: {
      const { arr, isRemove } = action;
      const newState = state.slice();
      console.log(arr);
      arr.forEach(element => {
        if (isRemove) newState[element.index] = null;
        else
          newState[element.index] = {
            value: element.turn ? 'X' : 'O',
            dirMark: -1
          };
      });
      return newState;
    }
    default:
      return state;
  }
};
export const isSorted = (state = true, action) => {
  switch (action.type) {
    case types.SORT: {
      return !state;
    }
    default:
      return state;
  }
};
export const history = (state = { arr: [], index: -1 }, action) => {
  const { arr, index } = state;
  switch (action.type) {
    case types.HISTORY.ADD: {
      const newArr = arr.slice(0, index + 1);
      newArr.push({ index: action.index, turn: action.turn });
      return {
        arr: newArr,
        index: index + 1
      };
    }
    case types.HISTORY.CHANGE_INDEX: {
      return {
        arr,
        index: action.index
      };
    }
    case types.HISTORY.REMOVE: {
      return {
        arr,
        index
      };
    }
    default:
      return state;
  }
};
