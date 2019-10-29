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
    case TYPE.REMOVE:
      return { arr: [], dir: -1 };
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
    case types.SQUARES.RESET: {
      return Array(400).fill(null);
    }
    default:
      return state;
  }
};
export const isSorted = (state = false, action) => {
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
    case types.HISTORY.RESET: {
      return { arr: [], index: -1 };
    }
    case types.HISTORY.REMOVE:
    default:
      return state;
  }
};

export const isFetching = (state = false, action) => {
  switch (action.type) {
    case 'DONE': {
      return false;
    }
    case 'DOING': {
      console.log('doing');
      return true;
    }
    default:
      return state;
  }
};
export const login = (state = 0, action) => {
  switch (action.type) {
    case 'SET_LOGIN': {
      return action.index;
    }
    default:
      return state;
  }
};
export const user = (state = null, action) => {
  switch (action.type) {
    case 'User_add': {
      return {
        user: action.user,
        token: action.token
      };
    }
    case 'User_reset': {
      return null;
    }
    default:
      return state;
  }
};
const initialInfoUser = {
  username: '',
  hoten: '',
  gioitinh: '',
  ngaysinh: '',
  avatar: '',
  fetched: false
};
export const infoUser = (state = initialInfoUser, action) => {
  switch (action.type) {
    case 'Add_info': {
      return { ...state, avatar: action.url };
    }
    case 'update_info': {
      return { ...state, ...action.user };
    }
    case 'reset_info': {
      return initialInfoUser;
    }
    default:
      return state;
  }
};

export const haveMessage = (state = [false], action) => {
  switch (action.type) {
    case 'SET_MESSAGE': {
      return [true, action.message, action.title];
    }
    case 'RESET_MESSAGE':
      return [false];
    default:
      return state;
  }
};
export const showModal = (state = false, action) => {
  switch (action.type) {
    case 'modal_set':
      return action.showModal;
    default:
      return state;
  }
};
