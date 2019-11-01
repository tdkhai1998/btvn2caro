import TYPE from './type';

const initialState = Array(400).fill(null);

const squares = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.ADD: {
      const newState = state.slice();
      newState[action.index] = {
        value: action.turn ? 'X' : 'O',
        dirMark: -1
      };
      return newState;
    }
    case TYPE.REMOVE: {
      const newState = state.slice();
      newState[action.index] = null;
      return newState;
    }
    case TYPE.CHANGE: {
      const { arr, isRemove } = action;
      const newState = state.slice();
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
    case TYPE.RESET: {
      return Array(400).fill(null);
    }
    default:
      return state;
  }
};

export default squares;
