import TYPE from './type';

const initialState = {
  mode: TYPE.modeType.Offline,
  yourTurn: TYPE.turnType.O
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.UPDATE: {
      return { ...state, ...action.s };
    }
    case TYPE.RESET:
      return initialState;
    default:
      return state;
  }
};
